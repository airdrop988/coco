import {get, post, getV2, postV2, putV2, deleteV2} from '../../../api/ApiUtils';
import {CLIENT_VALUATION, FI_REPO} from "../../Common/constants";
export default class API {
    /**************
     SEARCHBAR API
     ***************/
    static fetchSearchResults(searchFields, lob, searchFilterCriterias) {
        return new Promise(async (resolve) => {
            try {
                let res = await post(`v2/${lob}/profile/search`, {
                        searchFields: searchFields,
                        searchFilterCriterias: searchFilterCriterias
                    }),
                    data;
                const {success, payload} = res;

                /* FLATTEN DATA */
                data = success ? payload.map(x => {
                    if (x.parties) {
                        let counterParty = x.parties.find(p => p.role === 'COUNTERPARTY') || {};
                        let legalEntity = x.parties.find(p => p.role === 'LEGAL_OWNER') || {};
                        let leadCounterParty = x.parties.find(p => p.role === 'LEAD_COUNTERPARTY') || {};

                        x.legalEntityName = legalEntity.name;
                        x.sapLECode = legalEntity.sapLeCode;
                        x.legalEntityUCN = legalEntity.ucn;
                        x.legalEntitySPN = legalEntity.spn;
                        x.legalEntityEci = legalEntity.eci;

                        x.leadCounterPartySPN = leadCounterParty.spn;
                        x.leadCounterPartyName = leadCounterParty.name;

                        x.counterPartyName = counterParty.name;
                        x.counterPartyUCN = counterParty.ucn;
                        x.counterPartySPN = counterParty.spn;
                        x.counterPartyEci = counterParty.eci;
                    }
                    return x;
                }) : null
                resolve({success, data});

            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }


    /**************
     TABLE API
     ***************/
    static fetchTableEntry(params, status, lob) {
        return new Promise(async (resolve) => {
            try {
                let res;
                if (lob === CLIENT_VALUATION.toUpperCase()) {
                    res = await get(`${lob}/setup/cvprofile/ids/${params}/${status}`, {});
                }else {
                    res = await get(`${lob}/setup/agreement/ids/${params}/${status}`, {});
                }
                let {success, payload, reason} = res;
                resolve({success, payload, reason});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static fetchNewEntry(params) {
        return new Promise(async (resolve) => {
            try {
                resolve({success: true, payload: null});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    /**************
     SAVE/CREATE/SUBMIT API
     ***************/
    static onSave(profile, lob) {
        return new Promise(async (resolve) => {
            try {
                let res;
                if (lob === CLIENT_VALUATION.toUpperCase()) {
                    res = await post(`${lob}/setup/cvprofile/SAVE`, profile);
                } else {
                    res = await post(`${lob}/setup/agreement/SAVE`, profile);
                }
                const {success, payload, reason} = res;
                resolve({success, payload, reason});
                setTimeout(() => {
                    resolve({success: true, data: []});
                }, 4000);
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static onSubmit(profile, lob) {
        return new Promise(async (resolve) => {
            try {
                let res;
                if (lob === CLIENT_VALUATION.toUpperCase()) {
                    res = await post(`${lob}/setup/cvprofile/SUBMIT`, profile);
                } else {
                    res = await post(`${lob}/setup/agreement/SUBMIT`, profile);
                }
                const {success, payload, reason} = res;
                resolve({success, payload, reason});
                setTimeout(() => {
                    resolve({success: true, data: []});
                }, 4000);
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static onTerminate(lob, profileId) {
        return new Promise(async (resolve) => {
            try {
                let res = await post(`${lob}/setup/AGREEMENT_SETUP/TERMINATE/ids/${profileId}`, {});
                const {success, payload, reason} = res;
                resolve({success, payload, reason});
                setTimeout(() => {
                    resolve({success: true, data: []});
                }, 4000);
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static onCvTerminate(lob, profileId) {
        return new Promise(async (resolve) => {
            try {
                let res = await post(`${lob}/setup/CVPROFILE_SETUP/TERMINATE/ids/${profileId}`, {});
                const {success, payload, reason} = res;
                resolve({success, payload, reason});
                setTimeout(() => {
                    resolve({success: true, data: []});
                }, 4000);
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static onActivate(lob, profileId) {
        return new Promise(async (resolve) => {
            try {
                let res = await post(`${lob}/setup/AGREEMENT_SETUP/REACTIVATE/ids/${profileId}`, {});
                const {success, payload, reason} = res;
                resolve({success, payload, reason});
                setTimeout(() => {
                    resolve({success: true, data: []});
                }, 4000);
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static getAllAccounts(lob, profileId) {
        return new Promise(async (resolve) => {
            try {
                let response = await get(`${lob}/setup/AGREEMENT_SETUP/accounts/${profileId}`, {});
                const {success, payload, reason} = response;
                resolve({success, payload, reason});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static showAllAccountForNG(lob, legalEntityId, docId) {
        return new Promise(async (resolve) => {
            try {
                let response = await getV2(`${lob}/nettingProfile/accounts/${docId}/${legalEntityId}`, {});
                const {success, payload, reason} = response;
                resolve({success, payload, reason});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static getAllNettingGroup(lob, primaryUnifiedDocId, legalEntityId) {
        return new Promise(async (resolve) => {
            try {
                let response = await getV2(`${lob}/nettingProfile/${primaryUnifiedDocId}/${legalEntityId}`, {});
                const {success, payload, reason} = response;
                resolve({success, payload, reason});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static getAllNettingGroupByAgreementId(lob, agreementId) {
        return new Promise(async (resolve) => {
            try {
                let response = await getV2(`${lob}/nettingProfile/agreements/${agreementId}`, {});
                const {success, payload, reason} = response;
                resolve({success, payload, reason});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static getAllCounterpartyGroups(lob, legalEntityId) {
        return new Promise(async (resolve) => {
            try {
                let response = await getV2(`${lob}/counterPartyGroup/${legalEntityId}`, {});
                const {success, payload, reason} = response;
                resolve({success, payload, reason});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static saveCounterpartyGroups(lob, group) {
        return new Promise(async (resolve) => {
            try {
                let response = await postV2(`${lob}/counterPartyGroup/`, group);
                const {success, payload, reason} = response;
                resolve({success, payload, reason});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static deleteCounterpartyGroups(lob, group) {
        return new Promise(async (resolve) => {
            try {
                let response = await deleteV2(`${lob}/counterPartyGroup/`, group);
                const {success, payload, reason} = response;
                resolve({success, payload, reason});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static updateCounterpartyGroups(lob, group) {
        return new Promise(async (resolve) => {
            try {
                let response = await putV2(`${lob}/counterPartyGroup/`, group);
                const {success, payload, reason} = response;
                resolve({success, payload, reason});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static saveNettingGroupProfile(profile, lob) {
        return new Promise(async (resolve) => {
            try {
                let res = await postV2(`${lob}/nettingProfile`, profile);
                const {success, payload, reason} = res;
                resolve({success, payload, reason});
                setTimeout(() => {
                    resolve({success: true, data: []});
                }, 4000);
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static updateNettingGroups(lob, profile) {
        return new Promise(async (resolve) => {
            try {
                let response = await putV2(`${lob}/nettingProfile/`, profile);
                const {success, payload, reason} = response;
                resolve({success, payload, reason});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static deleteNettingGroups(lob, group) {
        return new Promise(async (resolve) => {
            try {
                let response = await deleteV2(`${lob}/nettingProfile/`, group);
                const {success, payload, reason} = response;
                resolve({success, payload, reason});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static getAccountsForGroup(lob, profileId) {
        return new Promise(async (resolve) => {
            try {
                let response = await get(`${lob}/setup/AGREEMENT_SETUP/accounts/${profileId}`, {});
                const {success, payload, reason} = response;
                resolve({success, payload, reason});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static getAccountById(lob, profileId, accountId, module, primaryUnifiedDocId, legalEntityId) {
        return new Promise(async (resolve) => {
            try {
                let response;
                if (module === 'netting') {
                    if (lob === FI_REPO.toUpperCase()) {
                        response = await getV2(`${lob}/nettingProfile/accounts/${primaryUnifiedDocId}/${legalEntityId}/${accountId}`, {});
                    } else {
                        response = await get(`${lob}/setup/AGREEMENT_SETUP/preferredAccounts/${profileId}/LIVE?accountId=${accountId}`, {});
                    }
                } else {
                    response = await get(`${lob}/setup/AGREEMENT_SETUP/accounts/${profileId}/${accountId}`, {});
                }
                const {success, payload, reason} = response;
                resolve({success, payload, reason});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    /**************
     SUBCOMPONENTS API
     ***************/
    static accountsSave(params) {
        return new Promise(async (resolve) => {
            try {
                setTimeout(() => {
                    resolve({success: true, data: []});
                }, 500);
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static getPreferredAccounts(lob, profileId, status) {
        return new Promise(async (resolve) => {
            try {
                let response = await get(`${lob}/setup/AGREEMENT_SETUP/preferredAccounts/${profileId}/${status}`, {});
                const {success, payload, reason} = response;
                resolve({success, payload, reason});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static getProfileHistory(lob, profileId, profileType, versionId) {
        return new Promise(async (resolve) => {
            try {
                let response = await get(`${lob}/setup/history/${profileId}/${profileType}/${versionId}`, {});
                // doing flat data for History
                let profileHistories = Object.assign([], response.payload),
                    tempHistories = [];
                if (profileHistories && profileHistories.length > 0) {
                    for (let i = 0; i < profileHistories.length; i++) {
                        let diffSet = profileHistories[i].attributeDiffSet;
                        if (diffSet) {
                            for (let j = 0; j < diffSet.length; j++) {
                                let item = Object.assign({}, profileHistories[i]);
                                item.attributeName = diffSet[j].attributeName;
                                item.attributeOldValue = diffSet[j].oldValue ? (diffSet[j].oldValue.value ? JSON.stringify(diffSet[j].oldValue.value) : null) : null;
                                item.attributeNewValue = diffSet[j].newValue ? (diffSet[j].newValue.value ? JSON.stringify(diffSet[j].newValue.value) : null) : null;
                                tempHistories.push(item);
                            }
                        }
                    }
                    response.payload = tempHistories;
                }
                const {success, payload, reason} = response;
                resolve({success, payload, reason});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static getAgreementByLeandDocId(lob, legalEntityId, docId, profileId) {
        return new Promise(async (resolve) => {
            try {
                let response = await get(`${lob}/clone/agreements/${legalEntityId}/${docId}`, {});
                const {success, payload, reason} = response;
                let data = success ? payload.map(x => {
                    if (x && x.parties) {
                        let counterParty = x.parties.find(p => p.role === 'COUNTERPARTY') || {};
                        let legalEntity = x.parties.find(p => p.role === 'LEGAL_OWNER') || {};
                        x.legalEntityName = legalEntity.name;
                        x.legalEntitySapLeCode = legalEntity.sapLeCode;
                        x.counterPartyName = counterParty.name;
                        x.counterPartySpn = counterParty.spn;
                    }
                    return x;
                }) : null;
                let filterData = data.filter(agreement => agreement.profileId !== profileId);
                resolve({success, data: filterData, reason});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static viewAgreementDifferece(lob, sourceId, targetId) {
        return new Promise(async (resolve) => {
            try {
                let response = await get(`${lob}/clone/agreements/diff/${sourceId}/${targetId}`, {});
                const {success, payload, reason} = response;
                resolve({success, data: payload.changeSet, reason});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static submitCloning(lob, sourceAgreementId, targetAgreementIds) {
        return new Promise(async (resolve) => {
            try {
                let res = await post(`${lob}/clone/agreements/${sourceAgreementId}`, targetAgreementIds);
                const {success, payload, reason} = res;
                resolve({success, payload, reason});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static getAllColtAudits(lob, agreementId, type) {
        return new Promise(async (resolve) => {
            try {
                let response = await get(`colt/history/${lob}/agreements/${agreementId}`, {});
                const {success, payload, reason} = response;
                resolve({success, payload, reason});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static getColtDetails(lob, agreementId) {
        return new Promise(async (resolve) => {
            try {
                let res = await get(`colt/${lob}/agreements/${agreementId}`, {});

                let resPayload = Object.assign({}, res.payload),
                    agreementMarginRegimeProduct = Object.assign({}, resPayload.agreementMarginRegimeProduct),
                    masterList = Object.assign([], agreementMarginRegimeProduct.value);

                agreementMarginRegimeProduct.value = masterList.filter((item) => item.selected === "Y");
                agreementMarginRegimeProduct.options = masterList;
                resPayload.agreementMarginRegimeProduct = agreementMarginRegimeProduct;
                res.payload = resPayload;

                const {success, payload, reason} = res;
                resolve({success, payload, reason});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static onColtSave(profile, lob, event) {
        return new Promise(async (resolve) => {
            try {
                let res = await post(`${lob}/colt/${event}`, profile);
                const {success, payload, reason} = res;
                resolve({success, payload, reason});
                setTimeout(() => {
                    resolve({success: true, data: []});
                }, 4000);
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }
    static loadAllStaticData(lob, keys) {
        return new Promise(async (resolve) => {
            try {
                let response = await post(`${lob}/static-data`, keys);
                const {success, payload, reason} = response;
                resolve({success, payload, reason});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }
    static saveStatementRelationProfile(profile, lob) {
        return new Promise(async (resolve) => {
            try {
                let res = await post(`${lob}/setup/STATEMENT_RELATION/SAVE`, profile);
                const {success, payload, reason} = res;
                resolve({success, payload, reason});
                /*setTimeout(() => {
                    resolve({success: true, data: []});
                }, 4000);*/
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }

    static fetchRefData (eci) {
        return new Promise(async(resolve) => {
            try {
                let res = await get(`ref-data/get/refClientData/${eci}`, eci);

                const {success, payload,reason} = res;

                /* FLATTEN DATA */
                let data = success ? payload.wholesaleCoverage : null;

                resolve({success, data});
            } catch (err) {
                resolve({success: false, status: err.status, reason: err.statusMessage || null});
            }
        });
    }
}

abcd
