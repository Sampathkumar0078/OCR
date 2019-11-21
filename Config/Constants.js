var path=require('path');

console.log(path.join(__dirname+'/../json/CCpaths.json')+' dir name');
module.exports = {
    system: {
        admin: {

        },
        server: {
            url: "http://localhost:4000"
        },
        query: {
            LIMIT_ONE: 1,
            DEFAULT_LIMIT: 20,
            ASEC_ODER: 1,
            DESC_ORDER: -1,
        }
    },
    user: {
        STATUS: {
            INACTIVE: 'INACTIVE',
            ACTIVE: 'ACTIVE'
        },
        ROLE: {
            ADMIN: 'ADMIN',
            MANAGEMENT: 'MANAGEMENT',
            BAU: 'BAU',
            ARR: ['ADMIN', 'MANAGEMENT', 'BAU']
        },
        ROLE_NO: {
            ADMIN: 1,
            MANAGEMENT: 2,
            BAU: 3,
        }
    },
    number: {
        ZERO: 0,
        ONE: 01,
        TEN: 10,
        TWELVE: 12
    },
    START_TIME_OF_DAY: ' 00:00:00',
    MSG: {
        CON_ESTABLISHED: ' database connected successfully.',
        CON_FAILURE: 'Unable to connect to the database'
    },
    DEPARTMENTS: {
        PO: 'PO',
        CC: 'CC',
        BO: 'BO',
        TO: 'TO'
    },
    ACTIONS_ARR: ['resume', 'pause'],
    BAI_AJEL_INPUT_FILE_PATH: {
        withoutDate: "D:\\Node Workspace\\share folder\\Bai Ajel Input File_",
        output: "D:\\Node Workspace\\bau\\json\\BaiAjel.txt"
    },
    extensions: {
        XLS: ".xls"
    },
    MONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    BA_STATUSES: {
        Incomplete: 'Incomplete',
        Checked: 'Checked',
        OA_Processing: 'OA Processing',
        Completed: 'Completed',
        Com_Buy_Processing: 'Comm. Buy Processing',
        Com_Sell_Processing: 'Comm. Sell Processing',
        Deleted: 'Deleted'
    },
    PO: {
        pathsJSON:path.join(__dirname+'/../json/POPaths.json'),
       // pathsJSON: "D:\\Node Workspace\\bau\\json\\POPaths.json",
       outPutTxt:path.join(__dirname+'/../json/POOutPut.txt'),
        //outPutTxt: "D:\\Node Workspace\\bau\\json\\POOutPut.txt",
        watani2: {
            subPath: "Watani 2\\Logs\\",
            noOfBots: 30,
            botIds: "BPOWT2",
            localSubPath: "watani2/",
            staticFolderName: 'D:\\Node Workspace\\share folder\\Watani 2\\Logs\\'
        },
        autoLeasing: {
            subPath: "Auto Leasing\\Logs\\",
            noOfBots: 11,
            botIds: "BPOALS",
            localSubPath: "auto leasing/",
            staticFolderName: 'D:\\Node Workspace\\share folder\\Auto Leasing\\Logs\\'
        },
        mrcc: {
            subPath: "Revolving Credit Card\\Logs\\",
            noOfBots: 8,
            botIds: "bporcc",
            localSubPath: "mrcc/",
            staticFolderName: 'D:\\Node Workspace\\share folder\\Revolving Credit Card\\Logs\\'
        }
    },
    folders: ['D:\\Node Workspace\\share folder\\Watani 2\\Logs\\', 'D:\\Node Workspace\\share folder\\Auto Leasing\\Logs\\', 'D:\\Node Workspace\\share folder\\Revolving Credit Card\\Logs\\'],
    BOOlEAN_YES: 'Yes',
    INT_ZERO: 0,
    NUMBER_HUNDRED: 100,
    FILE_NAME_REGEX: /^.*[\\\/]/,
    MINUTES_15: 900000,
    PROCESS_STATUS: {
        RUNNING: 1,
        PENDING: 0,
        COMPLETED: 4,
        DEBUGGING: 5
    },
    SAMA: {
        TIME_INTERVAL: 8,
        shortHand: ['TD', 'FU'],
        // TD: {
        //     processName: 'BO_TDB_Legal',
        //     pageName: 'Upload SAMM File to ROSS',
        //     stageName: 'Decision1'
        // },
        // FU: {
        //     processName: 'BO_SAMA_GeneralFileUploadProcess',
        //     pageName: 'Upload SAMM File to ROSS',
        //     stageName: 'Decision1'
        // }
        TD: {
            processName: 'Bae Ajel process',
            pageName: 'Check_Pre_Contracts_ in Queue',
            stageName: 'Decision1'
        },
        TOTAL_VOLUME: {
            processName: 'BO_SAMA_PendingVolume',
            pageName: 'SAMA report',
            stageName: 'set counts'
        },
        // QUEUES_ARR: ['BO_SAMA_Checker_MacroBlocking', 'BO_SAMA_Checker_Reject', 'BO_SAMA_Checker_Unblock', 'BO_SAMA_MacroBlocking', 'BO_SAMA_Reject_Queue', 'BO_SAMA_Unblock']
        QUEUES_ARR: ['BO_SAMA_Checker_MacroBlocking', 'BO_SAMA_Checker_Reject', 'BO_SAMA_Checker_Unblock', 'BO_SAMA_MacroBlocking', 'BO_Sama_Reject_Queue', 'BO_SAMA_Unblock'],
        CHECKERS: ['BO_SAMA_Checker_MacroBlocking', 'BO_SAMA_Checker_Unblock', 'BO_SAMA_Checker_Reject'],
        MAKERS: ['BO_SAMA_MacroBlocking', 'BO_SAMA_Unblock', 'BO_Sama_Reject_Queue']
    },
    BO: {
        QUEUES_ARR: ['BaiAjal-PreContract', 'BaiAjal-PostContract'],
        preContract: 'BaiAjal-PreContract',
        PostContract: 'BaiAjal-PostContract',
        FIRCO: {

            ROOT_FOLDER: 'D:\\Node Workspace\\share folder\\Prod\\BO\\Firco Payment Screening\\',
            SUB_FOLDER: '\\Report\\',
            INPUT_FOLDER: 'D:\\Node Workspace\\share folder\\Prod\\Dashboard Input\\',
            OUTPUT_JSON: 'D:\\Node Workspace\\bau\\json\\GeneralOutput.json'
        }
    },
    
    CC: {
        QUEUES_ARR: ['ARB_CLAIMS_ARB', 'Claims_ARB_Cus_ARB_POS', 'Claims_ARB_Cus_Local_ATM_POS', 'POS'],
        pathsJSON:path.join(__dirname+'/../json/CCpaths.json'),
        
        //pathsJSON: "D:\\Node Workspace\\bau\\json\\CCPaths.json",
        //outPutTxt: "F:\\OCR\\OCR-API\\bau\\json\\CCOutPut.txt",
        outPutTxt:path.join(__dirname+'/../json/CCOutPut.txt'),
        folders: [
            'D:\\Node Workspace\\share folder\\CC_MSD\\Ammend Installments\\Logs',
            'D:\\Node Workspace\\share folder\\CC_MSD\\Cash Acceptance Claims\\Logs',
            'D:\\Node Workspace\\share folder\\CC_MSD\\Change Product\\Logs',
            'D:\\Node Workspace\\share folder\\CC_MSD\\Enable CC\\Logs',
            'D:\\Node Workspace\\share folder\\CC_MSD\\Link Contracts\\Logs',
            'D:\\Node Workspace\\share folder\\CC_MSD\\Merchant claims\\Logs',
            'D:\\Node Workspace\\share folder\\CC_MSD\\NOC\\Logs',
            'D:\\Node Workspace\\share folder\\CC_MSD\\Partial Payment - Watani\\Logs',
            'D:\\Node Workspace\\share folder\\CC_MSD\\Reissue Credit Card\\Logs',
        ],
        ammendInstallments: {
            subPath: "Ammend Installments\\Logs\\",
            noOfBots: 1,
            botIds: "CC_AmendInstallment_HOROBOCCPRD3V_",
            localSubPath: "Ammend Installments/",
            staticFolderName: 'D:\\Node Workspace\\share folder\\CC_MSD\\Ammend Installments\\Logs\\',
            inScopeReassignedReasons: ['No transactions present in 576 and 312 code for the customer', 'Product code is one of the restricted category']
        },
        cashAcceptanceClaims: {
            subPath: "Cash Acceptance Claims\\Logs\\",
            noOfBots: 1,
            botIds: "CC_CashAcceptanceClaim_HOROBOCCPRD36V_",
            localSubPath: "Cash Acceptance Claims/",
            staticFolderName: 'D:\\Node Workspace\\share folder\\CC_MSD\\Cash Acceptance Claims\\Logs\\',
            inScopeReassignedReasons: ['No records found in BASE 24 for data provided in CRM']
        },
        changeProduct: {
            subPath: "Change Product\\Logs\\",
            noOfBots: 9,
            botIds: "CC_ChangeProduct_HOROBOCCPRD",
            prodIds: ['6V', '7V', '8V', '11V', '12V', '30V', '35V', '38V', '94V', '155V', '165V'],
            localSubPath: "Change Product/",
            staticFolderName: 'D:\\Node Workspace\\share folder\\CC_MSD\\Change Product\\Logs\\',
            inScopeReassignedReasons: [
                'End date is past date',
                'Invalid credit card type',
            ]
        },
        enableCc: {
            subPath: "Enable CC\\Logs\\",
            noOfBots: 1,
            botIds: "CC_EnableCC_HOROBOCCPRD154V_",
            localSubPath: "Enable CC/",
            staticFolderName: 'D:\\Node Workspace\\share folder\\CC_MSD\\Enable CC\\Logs\\',
            inScopeReassignedReasons: []
        },
        linkContracts: {
            subPath: "Link Contracts\\Logs\\",
            noOfBots: 1,
            botIds: "CC_LinkContract_HOROBOCCPRD52V_",
            localSubPath: "Link Contracts/",
            staticFolderName: 'D:\\Node Workspace\\share folder\\CC_MSD\\Link Contracts\\Logs\\',
            inScopeReassignedReasons: [
                'No transactions present in 576 and 312 code for the customer',
                'Info transactions page is hidden in RBS',
                'Inquiry reason field not found in RBS'
            ]
        },
        merchantClaims: {
            subPath: "Merchant claims\\Logs\\",
            noOfBots: 1,
            botIds: "CC_MerchantClaim_HOROBOCCPRD89V_",
            localSubPath: "Merchant claims/",
            staticFolderName: 'D:\\Node Workspace\\share folder\\CC_MSD\\Merchant claims\\Logs\\',
            inScopeReassignedReasons: [
                'Invalid device number',
                'Merchant name not found in list of terminal Ids',
                'Unable to match amount in CRM to amount in Cortex'
            ]
        },
        noc: {
            subPath: "NOC\\Logs\\",
            noOfBots: 1,
            botIds: "CC_NOC_HOROBOCCPRD9V_",
            localSubPath: "NOC/",
            staticFolderName: 'D:\\Node Workspace\\share folder\\CC_MSD\\NOC\\Logs\\',
            inScopeReassignedReasons: ['Balance field is hidden in RBS'],
            outScopeReassignedReasons: ['BE:    More Than One Customer Name for the Contract', 'BE:    BE: Customer Account Balance is Less Than Zero ']
        },
        partialPayment: {
            subPath: "Partial Payment - Watani\\Logs\\",
            noOfBots: 1,
            botIds: "CC_PartialWatani_HOROBOCCPRD31V_",
            localSubPath: "Partial Payment - Watani/",
            staticFolderName: 'D:\\Node Workspace\\share folder\\CC_MSD\\Partial Payment - Watani\\Logs\\',
            inScopeReassignedReasons: ['Amount greater than or equal to 50,000 SAR']
        },
        reIssueCreditCard: {
            subPath: "Reissue Credit Card\\Logs\\",
            noOfBots: 1,
            botIds: "CC_ReissueCreditCard_HOROBOCCPRD105V_",
            localSubPath: "Reissue Credit Card/",
            staticFolderName: 'D:\\Node Workspace\\share folder\\CC_MSD\\Reissue Credit Card\\Logs\\',
            inScopeReassignedReasons: ['Invalid Card Status - "CLSC" or "RTRN"', "BOT didn't find any data in prime from Serno Search"]
        },
    },
    SORT: {
        ASC: 'ASC',
        DESC: 'DESC'
    },
    BOOLEAN: {
        TRUE: true,
        FALSE: false,
        DB_TRUE: 1,
        DB_FALSE: 0
    },
    COLOUR_CODE: {
        RED: '#ff4c6a',
        GREEN: '#00BA33'
    },
    STATUS_NAMES: {
        COMPLETED: 'Completed'
    },
    NULL: null,
    NOT_APPLICABLE: 'NA',
    DAYS_STR: "days",
    NO_RECORD_FOUND: 'No record found',
    EXYENSION: {
        EXCEL: '.xlsx'
    },
    DB_CONST: {
        LITERAL_GETDATE: 'GETDATE()',
        DEFAULT_EXCLUDE: { exclude: ['createdAt', 'updatedAt'] }
    },
    REGEX: {
        ONLY_NUMS: /\d+/g
    }
}