pragma solidity ^0.4.21;

contract SimpleSurvey {
    mapping(address => uint8[]) surveyMap;
    address[] surveyMemberList;
    address surveyOwner;

    function SimpleSurvey() public payable {
        surveyOwner = msg.sender;
    }
    
    function setSurveyResult(uint8[] surveyResult) public returns (bool) {
        uint i = 0;
        for (i = 0; i < surveyMemberList.length; i++) {
            if (surveyMemberList[i] == msg.sender) {
                return false;
            }
        }

        surveyMemberList.push(msg.sender);

        for (i = 0; i < surveyResult.length; i++) {
            surveyMap[msg.sender].push(surveyResult[i]);
        }

        return true;
    }

    function getSurveyCount() public constant returns (uint) {
        return surveyMemberList.length;
    }

    function getSurveyMemberList() public constant returns (address[]) {
        return surveyMemberList;
    }

    function getSurveyResult(address addr) public constant returns (uint8[]) {
        return surveyMap[addr];
    }
}