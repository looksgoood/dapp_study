pragma solidity ^0.4.21;

contract SimpleSurvey {
    mapping(address => uint8[]) surveyMap;
    address[] surveyMemberList;
    address surveyOwner;

    function SimpleSurvey() public {
        surveyOwner = msg.sender;
    }
    
    function setSurveyResult(uint8[] surveyResult) public {
        surveyMemberList.push(msg.sender);

        for (uint i = 0; i < surveyResult.length; i++) {
            surveyMap[msg.sender].push(surveyResult[i]);
        }
    }

    function getSurveyCount() public constant returns (uint) {
        if (msg.sender != surveyOwner)
            return;
        return surveyMemberList.length;
    }

    function getSurveyMemberList() public constant returns (address[]) {
        if (msg.sender != surveyOwner)
            return;
        return surveyMemberList;
    }

    function getSurveyResult(address addr) public constant returns (uint8[]) {
        if (msg.sender != surveyOwner)
            return;
        return surveyMap[addr];
    }
}