pragma solidity ^0.4.21;

import "./simplesurvey.sol";

contract SurveyChain {
    mapping(string => SimpleSurvey) db;
    string[] db_key_list;
    address owner;

    function SurveyChain() public {
        owner = msg.sender;
    }
    
    function createNewSurvey(uint db_key) public payable {
        string memory new_key = strConcat(toString(msg.sender), uintToString(db_key));
        SimpleSurvey s;
        bool contain;
        (s, contain) = getSurvey(msg.sender, db_key);
        if (contain) {
            return;
        }

        s = new SimpleSurvey(db_key);
        db[new_key] = s;
        db_key_list.push(new_key);
    }


    function setSurveyResult(address surveyOwner, uint db_key, uint8[] surveyResult) public returns (bool) {
        SimpleSurvey s;
        bool contain;
        (s, contain) = getSurvey(msg.sender, db_key);
        if (!contain) {
            return;
        }

        return s.setSurveyResult(surveyResult);
    }

    function getSurveyCount(address surveyOwner, uint db_key) public constant returns (uint) {
        SimpleSurvey s;
        bool contain;
        (s, contain) = getSurvey(msg.sender, db_key);
        if (!contain) {
            return;
        }

        return s.getSurveyCount();
    }

    function getSurveyMemberList(address surveyOwner, uint db_key) public constant returns (address[]) {
        SimpleSurvey s;
        bool contain;
        (s, contain) = getSurvey(msg.sender, db_key);
        if (!contain) {
            return;
        }

        return s.getSurveyMemberList();
    }

    function getSurveyResult(address surveyOwner, uint db_key, address target_addr) public constant returns (uint8[]) {
        SimpleSurvey s;
        bool contain;
        (s, contain) = getSurvey(msg.sender, db_key);
        if (!contain) {
            return;
        }

        return s.getSurveyResult(target_addr);
    }

    //Internal functions.
    function getSurvey(address surveyOwner, uint db_key) internal returns (SimpleSurvey, bool) {
        string memory new_key = strConcat(toString(surveyOwner), uintToString(db_key));
        for(uint i = 0; i < db_key_list.length; i++) {
            string memory compare_key = db_key_list[i];
            if (compareStrings(compare_key, new_key)) {
                return (db[new_key], true);
            }
        }

        return (0, false);
    }

    function toString(address x) internal returns (string) {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++)
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        return string(b);
    }

    function uintToString(uint value) internal constant returns (string str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        uint v = value;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = byte(48 + remainder);
        }
        bytes memory s = new bytes(i + 1);
        for (uint j = 0; j <= i; j++) {
            s[j] = reversed[i - j];
        }
        str = string(s);
    }

    function strConcat(string _a, string _b) internal returns (string){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        string memory abcde = new string(_ba.length + _bb.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
        return string(babcde);
    }
    
    function compareStrings (string a, string b) internal view returns (bool) {
        return keccak256(a) == keccak256(b);
    }
}