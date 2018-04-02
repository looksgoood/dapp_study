pragma solidity ^0.4.21;
pragma experimental ABIEncoderV2;

contract SimpleSurvey {
    enum SurveyChoices { ChoiceSurvey, RankSurvey, SubjectiveSurvey }
    struct SurveyForm {
        SurveyChoices surveyKey;
        uint choiceValue;
        uint rankValue;
        string subjectiveValue;
    }

    mapping(address => SurveyForm[]) public surveyMap;
    address[] public surveyMemberList;
    address public surveyOwner;

    function SimpleSurvey() public {
        surveyOwner = msg.sender;
    }

    function set(SurveyForm[] surveyResult) public {
        surveyMemberList.push(msg.sender);

        for (uint i = 0; i < surveyResult.length; i++) {
            surveyMap[msg.sender].push(surveyResult[i]);
        }
    }

    function getSurveyCount() public constant returns (uint) {
        return surveyMemberList.length;
    }

    function getSurveyMemberList() public constant returns (address[]) {
        return surveyMemberList;
    }

    function getSurveyResult(address addr) public constant returns (SurveyForm[]) {
        return surveyMap[addr];
    }
}