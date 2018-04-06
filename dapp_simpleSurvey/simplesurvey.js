// let jaehyunAccount = '0x72ac9f1c5a437a7fa2f640075f11e5f8afe1c81d';
let jaehyunAccount = '0x4487f5bbFd35878879eB557F7E25C2632635eD5B';
let contractAddress = '';
let abi = [{"constant":true,"inputs":[],"name":"getSurveyMemberList","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getSurveyResult","outputs":[{"name":"","type":"uint8[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"surveyResult","type":"uint8[]"}],"name":"setSurveyResult","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getSurveyCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the brower (Mist/MetaMask)
    // if (typeof web3 != 'undefined') {
    //     // Use Mist/MetaMask's provider
    //     this.window.web3 = new Web3(web3.currentProvider);
    // } else {
        console.log('No web3? You should consider trying MetaMask!')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgnmmt / fail)
        this.window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
    // }

    // Now you can start your app & access web3 freely
    startApp();
});

function startApp() {
    // let solc = require('solc');
    // let fs = require('fs');
    // let input = fs.readFileSync('simplesurvey.sol').toString();
    // // Setting 1 as second paramateractivates the optimiser
    // let output = solc.compile(input, 1)
    // for (let contractName in output.contracts) {
    //     // code and ABI that are needed by web3
    //     console.log(contractName + ': ' + output.contracts[contractName].bytecode)
    //     console.log(contractName + '; ' + JSON.parse(output.contracts[contractName].interface))
    // }

    // simpleStorageContract = web3.eth.contract(abi);
    // simpleStorage = simpleStorageContract.at(contractAddress);
    web3.eth.getAccounts(function(e, r) {
        document.getElementById('accountAddr').innerHTML = getLink(r[0]);
    });
    updateBalance();
}

function getLink(addr) {
    return '<a target="_blank" href=https://ropsten.etherscan.io/address/' + addr + '>' + addr + '</a>';
}

function createContract() {
    let bytecode = '0x6060604052341561000f57600080fd5b33600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506106568061005f6000396000f300606060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631a4914681461006757806336544ec9146100d15780635818fd241461015f5780639fe140b1146101b9575b600080fd5b341561007257600080fd5b61007a6101e2565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156100bd5780820151818401526020810190506100a2565b505050509050019250505060405180910390f35b34156100dc57600080fd5b610108600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506102d3565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561014b578082015181840152602081019050610130565b505050509050019250505060405180910390f35b341561016a57600080fd5b6101b76004808035906020019082018035906020019080806020026020016040519081016040528093929190818152602001838360200280828437820191505050505050919050506103f2565b005b34156101c457600080fd5b6101cc61050d565b6040518082815260200191505060405180910390f35b6101ea610577565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610246576102d0565b60018054806020026020016040519081016040528092919081815260200182805480156102c857602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001906001019080831161027e575b505050505090505b90565b6102db61058b565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610337576103ed565b6000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054806020026020016040519081016040528092919081815260200182805480156103e557602002820191906000526020600020906000905b82829054906101000a900460ff1660ff16815260200190600101906020826000010492830192600103820291508084116103ae5790505b505050505090505b919050565b600060018054806001018281610408919061059f565b9160005260206000209001600033909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050600090505b8151811015610509576000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080548060010182816104b591906105cb565b916000526020600020906020918282040191900684848151811015156104d757fe5b90602001906020020151909190916101000a81548160ff021916908360ff16021790555050808060010191505061045c565b5050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561056b57610574565b60018054905090505b90565b602060405190810160405280600081525090565b602060405190810160405280600081525090565b8154818355818115116105c6578183600052602060002091820191016105c59190610605565b5b505050565b81548183558181151161060057601f016020900481601f016020900483600052602060002091820191016105ff9190610605565b5b505050565b61062791905b8082111561062357600081600090555060010161060b565b5090565b905600a165627a7a72305820423b049198cc8327ca6d4e1da238c870d6c1497982e98c2eaa265929d68ad1270029';
    let simpleSurveyContract = web3.eth.contract(abi);
    let simpleSurvey = simpleSurveyContract.new(
       {
         from: web3.eth.accounts[0], 
         data: bytecode, 
         gas: '3000000'
       }, function (e, contract){
        console.log(e, contract);
        if (typeof contract !== 'undefined' && typeof contract.address !== 'undefined') {
             console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
             document.getElementById('contractAddr').innerHTML = getLink(contract.address);
             contractAddress = contract.address;    //TODO
             //need to store contract address to DB
        }
     })

     console.log(simpleSurvey);
}

function sendTransaction() {
    let newValue = document.getElementById('newValue').value;
    tx = {
        value:web3.toWei(newValue, "ether"),
        from: web3.eth.accounts[0],
        to: jaehyunAccount,
    };

    web3.eth.sendTransaction(tx, function(e, r) {
        console.log(e, r);
        updateBalance();
    });

    console.log("transaction processing!");
}

function updateBalance() {
    let address = web3.eth.accounts[0];
    web3.eth.getBalance(address, function(e, r) {
        let balance = web3.fromWei(r, 'ether');
        document.getElementById('balance').innerHTML = '(balance: ' + balance + ' ETH)';
    });
}

function setSurveyResult() {
    if (contractAddress == '') {
        console.error("create contract first!");
        return;
    }

    let surveyResult = document.getElementById('surveyResult').value;
    console.log(surveyResult);

    let simpleSurveyContract = web3.eth.contract(abi);
    let simpleSurvey = simpleSurveyContract.at(contractAddress);

    var uint8array = new TextEncoder("utf-8").encode(surveyResult);
    console.log(uint8array);
    let temp = [1, 2, 3, 4, 5];
    simpleSurvey.setSurveyResult(temp, function(e, r){
        console.log("setSurveyResult Finish!", e, r);
    });
}

function getSurveyCount() {
    if (contractAddress == '') {
        console.error("create contract first!");
        return;
    }

    let simpleSurveyContract = web3.eth.contract(abi);
    let simpleSurvey = simpleSurveyContract.at(contractAddress);

    simpleSurvey.getSurveyCount(function(e, r){
        console.log("getSurveyCount Finish!", e, r);
        let count = r.c[0];
        document.getElementById('surveyCount').innerHTML = '(count: ' + count + ')';
    });

}


// function getValue() {
//     simpleStorage.get(function(e, r) {
//         if (r != null) {
//             document.getElementById('storedData').innerHTML = r.toNumber();
//         }
//     });

//     web3.eth.getBlockNumber(function(e, r) {
//         if (r != null) {
//             document.getElementById('lastBlock').innerHTML = r;
//         }
//     })
// }

// function setValue() {
//     let newValue = document.getElementById('newValue').value;
//     let txid;

//     simpleStorage.set(newValue, function(e, r) {
//         if (r != null) {
//             document.getElementById('result').innerHTML = 'Transaction id: ' + r + '<span id="pending" style="color:red;">(Pending)</span>';
//             txid = r;
//         }
//     });

//     let filter = web3.eth.filter('latest');
//     filter.watch(function(e, r) {
//         getValue();
//         web3.eth.getTransaction(txid, function(e, r) {
//             if (r != null && r.blockNumber > 0) {
//                 document.getElementById('pending').innerHTML = '(Updated block: ' + r.blockNumber + ')';
//                 document.getElementById('pending').style.cssText = 'color:green;';
//                 document.getElementById('storedData').style.cssText = 'color:green; font-size:300%;';
//                 filter.stopWtching();
//             }
//         });
//     });
// }