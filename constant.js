export const DEFAULT_COLUMNS = [
    {name: 'marginCallCob', displayName: 'COB Date', isKey: true},
    {name: 'marginCallStatus', displayName: 'Margin Call Status'},
    {name: 'clientEntityName', displayName: 'Counterparty'},
    {name: 'callDirection', displayName: 'Call Direction'},
    {name: 'callNotificationTime', displayName: 'Call Notification Time'},
    {name: 'excessDeficitAmount', displayName: 'Excess Deficit Amount'},
    {name: 'currencyCode',displayName: 'Currency', showValue: true}
];

export const DERIVATIVES_COLUMNS = [
    "Call Status", "COB", "Statement ID", "Call Notification Status", "Statement Status", "Call ID", "Good Order",
    "Margin Acct #", "Version #", "SGO Version #", "Counterparty", "Legal Entity", "Call Time", "Margin Context ID",
    "SMC Context Number", "Gauss Context Number", "Released Time", "Action", "Split Type", "Rep CCY",
    "Excess/Deficit in RPT CCY", "CP Call Amount", "Segregation Model", "CSR", "Region", "Margining System",
    "Coded Statement Name", "Legal Entity UCN", "Counterparty SPN", "Underlyer CCY", "Fund Type",
    "Excess/Deficit in Underlyer", "Adj Excess/Deficit in Underlyer", "VM", "Total Equity", "Total Collateral Held",
    "IM", "Agreed Amount", "Disputed Amount", "Pending Amount", "Dispute Reason", "Age Of Dispute",
    "Dispute Comments", "Agreed Requirement", "Previous Matched RQV", "Bilateral", "Unilateral", "CP Favour",
    "CP VM", "Margin System Status", "Risk Margin Status", "Last Updated By", "Proof", "Group", "CCY Cut-off",
    "Transfer Time", "Netting", "Statement Type", "Auto Release", "Auto Release Time", "Reminder Status",
    "Reminder Sent Time", "Confirmation Status", "Confirmation Sent Time", "Auto-agree", "Counterparty Type",
    "Statement Failure Reason", "Notification Flag", "IA AMP", "Notification Status", "Notification Time",
    "Valuation Agent", "Agreement Good Order", "Agreement Auto Release Flag", "Margin Call Issued Time",
    "Statement Released Time", "Statement Auto Release Flag", "Statement Auto Released Time", "CP Call Margin AmpId",
    "LE Call Margin AmpId", "Business Key", "Agreement AMP ID", "Counterparty AMP Collateral Balance", "Audit",
    "Call Status (Latest)", "Excess/Deficit in RPT CCY (Latest)", "Version # (Latest)", "Action (Latest)",
    "VM (Latest)", "IM (Latest)", "Total Collateral Held (Latest)", "Previous Matched RQV (Latest)",
    "Agreement Good Order (Latest)", "Collateral In Transit (Latest)", "Trade (Latest)", "FX Rate (vs USD)",
    "$ Margin Call Amt", "$ Agreed Amt", "$ Disputed Amt", "$ Margin Calc Amt Latest"
];

export const CROSSMARGIN_COLUMNS = [
    "Agreement/Account ID", "Product", "JPM Legal Entity", "Fund Account ID", "Counterparty Name", "Call Status",
    "COB Date", "Good Order Check", "SPN", "Client Name", "Action", "REP CCY", "Call Amount", "CP Call Amount",
    "Agreed Amount", "Disputed Amount", "Dispute Reason", "Dispute Comments", "Total Age of Dispute", "Comment",
    "Statement Status", "Notification Time", "Response SLA", "XM House", "Agreed XM House", "Non-XM House",
    "Agreed Non-XM House", "Total House", "CCP/Reg Min", "Total IM Req", "Additional House IM", "CPMNA House IM",
    "Total IM (allocated)", "Seg.IM", "Rec.IM", "VM Requirement", "Collateral Value", "PB Equity", "MTA",
    "Amp Flag", "Amp Expected Notification"
]

export const DERIVATIVES_DEFAULT_COLUMNS_AS_BLOTTER = [
    {
        "name": "marginCallStatus",
        "displayName": "Call Status"
    },
    {
        "name": "cobDate",
        "displayName": "COB"
    },
    {
        "name": "statementId",
        "displayName": "Statement ID"
    },
    {
        "name": "issueCallNotificationStatus",
        "displayName": "Call Notification Status"
    },
    {
        "name": "statementStatus",
        "displayName": "Statement Status"
    },
    {
        "name": "callID",
        "displayName": "Call ID",
        "isKey": true
    },
    {
        "name": "goodOrder",
        "displayName": "Good Order"
    },
    {
        "name": "agreementNumber",
        "displayName": "Margin Acct #"
    },
    {
        "name": "version",
        "displayName": "Version #"
    },
    {
        "name": "sgoVersion",
        "displayName": "SGO Version #"
    },
    {
        "name": "clientEntityName",
        "displayName": "Counterparty"
    },
    {
        "name": "legalEntityName",
        "displayName": "Legal Entity"
    },
    {
        "name": "callNotificationTime",
        "displayName": "Call Time"
    },
    {
        "name": "marginNodeContextId",
        "displayName": "Margin Context ID"
    },
    {
        "name": "smcContextNumber",
        "displayName": "SMC Context Number"
    },
    {
        "name": "gaussCompositeContextKey",
        "displayName": "Gauss Context Number"
    },
    {
        "name": "releasedTime",
        "displayName": "Released Time"
    },
    {
        "name": "action",
        "displayName": "Action"
    },
    {
        "name": "requirementType",
        "displayName": "Split Type"
    },
    {
        "name": "repCCY",
        "displayName": "Rep CCY"
    },
    {
        "name": "excessDeficitInRPTCCY",
        "displayName": "Excess/Deficit in RPT CCY"
    },
    {
        "name": "cPCallAmount",
        "displayName": "CP Call Amount"
    },
    {
        "name": "segregationModel",
        "displayName": "Segregation Model"
    },
    {
        "name": "cSR",
        "displayName": "CSR"
    },
    {
        "name": "region",
        "displayName": "Region"
    },
    {
        "name": "marginingSystem",
        "displayName": "Margining System"
    },
    {
        "name": "codedStatementName",
        "displayName": "Coded Statement Name"
    },
    {
        "name": "legalEntityUcn",
        "displayName": "Legal Entity UCN"
    },
    {
        "name": "clientEntitySpn",
        "displayName": "Counterparty SPN"
    },
    {
        "name": "currencyCode",
        "displayName": "Underlyer CCY"
    },
    {
        "name": "fundType",
        "displayName": "Fund Type"
    },
    {
        "name": "excessDeficitInUnderlyer",
        "displayName": "Excess/Deficit in Underlyer"
    },
    {
        "name": "adjExcessDeficitInUnderlyer",
        "displayName": "Adj Excess/Deficit in Underlyer"
    },
    {
        "name": "vM",
        "displayName": "VM"
    },
    {
        "name": "totalEquity",
        "displayName": "Total Equity"
    },
    {
        "name": "collateralPosition",
        "displayName": "Total Collateral Held"
    },
    {
        "name": "iM",
        "displayName": "IM"
    },
    {
        "name": "agreedAmount",
        "displayName": "Agreed Amount"
    },
    {
        "name": "disputedAmount",
        "displayName": "Disputed Amount"
    },
    {
        "name": "pendingAmount",
        "displayName": "Pending Amount"
    },
    {
        "name": "disputeReason",
        "displayName": "Dispute Reason"
    },
    {
        "name": "disputeDiffAge",
        "displayName": "Age Of Dispute"
    },
    {
        "name": "disputeComments",
        "displayName": "Dispute Comments"
    },
    {
        "name": "agreedRequirement",
        "displayName": "Agreed Requirement"
    },
    {
        "name": "previousMatchedRQV",
        "displayName": "Previous Matched RQV"
    },
    {
        "name": "bilateral",
        "displayName": "Bilateral"
    },
    {
        "name": "bilateral",
        "displayName": "Unilateral"
    },
    {
        "name": "cPFavour",
        "displayName": "CP Favour"
    },
    {
        "name": "cPVM",
        "displayName": "CP VM"
    },
    {
        "name": "externalMarginSystemStatus",
        "displayName": "Margin System Status"
    },
    {
        "name": "riskMarginStatus",
        "displayName": "Risk Margin Status"
    },
    {
        "name": "lastUpdatedBy",
        "displayName": "Last Updated By"
    },
    {
        "name": "proof",
        "displayName": "Proof"
    },
    {
        "name": "group",
        "displayName": "Group"
    },
    {
        "name": "cCYCutoff",
        "displayName": "CCY Cut-off"
    },
    {
        "name": "transferTime",
        "displayName": "Transfer Time"
    },
    {
        "name": "grossPaymentNettingFlg",
        "displayName": "Netting"
    },
    {
        "name": "statementType",
        "displayName": "Statement Type"
    },
    {
        "name": "autoRelease",
        "displayName": "Auto Release"
    },
    {
        "name": "autoReleaseTime",
        "displayName": "Auto Release Time"
    },
    {
        "name": "issueCallReminderStatus",
        "displayName": "Reminder Status"
    },
    {
        "name": "issueCallReminderSentDtTime",
        "displayName": "Reminder Sent Time"
    },
    {
        "name": "confirmationStatus",
        "displayName": "Confirmation Status"
    },
    {
        "name": "confirmationSentTime",
        "displayName": "Confirmation Sent Time"
    },
    {
        "name": "autoagree",
        "displayName": "Auto-agree"
    },
    {
        "name": "cpType",
        "displayName": "Counterparty Type"
    },
    {
        "name": "statementFailureReason",
        "displayName": "Statement Failure Reason"
    },
    {
        "name": "notificationFlag",
        "displayName": "Notification Flag"
    },
    {
        "name": "iAAMP",
        "displayName": "IA AMP"
    },
    {
        "name": "notificationStatus",
        "displayName": "Notification Status"
    },
    {
        "name": "notificationTime",
        "displayName": "Notification Time"
    },
    {
        "name": "valuationAgent",
        "displayName": "Valuation Agent"
    },
    {
        "name": "agreementGoodOrder",
        "displayName": "Agreement Good Order"
    },
    {
        "name": "autoRelease",
        "displayName": "Agreement Auto Release Flag"
    },
    {
        "name": "marginCallIssuedTime",
        "displayName": "Margin Call Issued Time"
    },
    {
        "name": "statementReleasedTime",
        "displayName": "Statement Released Time"
    },
    {
        "name": "statementAutoReleaseFlag",
        "displayName": "Statement Auto Release Flag"
    },
    {
        "name": "statementAutoReleasedTime",
        "displayName": "Statement Auto Released Time"
    },
    {
        "name": "cPCallMarginAmpId",
        "displayName": "CP Call Margin AmpId"
    },
    {
        "name": "lECallMarginAmpId",
        "displayName": "LE Call Margin AmpId"
    },
    {
        "name": "businessKey",
        "displayName": "Business Key"
    },
    {
        "name": "agreementAMPID",
        "displayName": "Agreement AMP ID"
    },
    {
        "name": "counterpartyAMPCollateralBalance",
        "displayName": "Counterparty AMP Collateral Balance"
    },
    {
        "name": "audit",
        "displayName": "Audit"
    },
    {
        "name": "callStatusLatest",
        "displayName": "Call Status (Latest)"
    },
    {
        "name": "excessDeficitInRPTCCYLatest",
        "displayName": "Excess/Deficit in RPT CCY (Latest)"
    },
    {
        "name": "versionLatest",
        "displayName": "Version # (Latest)"
    },
    {
        "name": "actionLatest",
        "displayName": "Action (Latest)"
    },
    {
        "name": "vMLatest",
        "displayName": "VM (Latest)"
    },
    {
        "name": "iMLatest",
        "displayName": "IM (Latest)"
    },
    {
        "name": "totalCollateralHeldLatest",
        "displayName": "Total Collateral Held (Latest)"
    },
    {
        "name": "previousMatchedRQVLatest",
        "displayName": "Previous Matched RQV (Latest)"
    },
    {
        "name": "agreementGoodOrderLatest",
        "displayName": "Agreement Good Order (Latest)"
    },
    {
        "name": "collateralInTransitLatest",
        "displayName": "Collateral In Transit (Latest)"
    },
    {
        "name": "tradeLatest",
        "displayName": "Trade (Latest)"
    },
    {
        "name": "fXRateVsUSD",
        "displayName": "FX Rate (vs USD)"
    },
    {
        "name": "MarginCallAmt",
        "displayName": "$ Margin Call Amt"
    },
    {
        "name": "AgreedAmt",
        "displayName": "$ Agreed Amt"
    },
    {
        "name": "DisputedAmt",
        "displayName": "$ Disputed Amt"
    },
    {
        "name": "MarginCalcAmtLatest",
        "displayName": "$ Margin Calc Amt Latest"
    }
]
