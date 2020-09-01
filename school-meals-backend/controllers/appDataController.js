const mongoose = require('mongoose');
const AppData = mongoose.model('AppData');

exports.createAppData = (req, res) => {
    let reqData = req.body;
    console.log(reqData);
    let appData = new AppData({
        certifiedCorrect: getBoolValue(req.body.certifiedCorrect),
        electToProvideIncome: getBoolValue(req.body.electToProvideIncome),
        attestation: req.body.attestation,
        contact: {
            email: req.body.contact.email,
            address1: req.body.contact.address1,
            address2: req.body.contact.address2,
            city: req.body.contact.city,
            state: req.body.contact.state,
            phone: req.body.contact.phone,
            zip: req.body.contact.zip
        },
        signature: {
            noSsn: getBoolValue(req.body.signature.noSsn),
            ssnLastFour: req.body.signature.ssnLastFour
        },
        students: getStudents(req.body.students),
        otherChildren: getOtherChildren(req.body.otherChildren),
        adults: getAdults(req.body.adults)
    });
    
    appData.save(err => {
        if (err) {
            console.log(err);
            return res.status(500).send("an error has occurred when saving your data. We are working to resolve it as quickly as possible.");
        }
        res.status(200).send(reqData);
    })
}

function getStudents(studentArray) {
    students = [];

    studentArray.forEach((student) => {
        students.push({
            id: student.id,
            isChild: getBoolValue(student.isChild),
            incomeTypes: {
                child: {
                    isApplicable: getBoolValue(student.incomeTypes.child.isApplicable),
                    sources: getStudentSources(student.incomeTypes.child.sources)
                }
            },
            isStudent: getBoolValue(student.isStudent),
            isFoster: getBoolValue(student.isFoster),
            isHomeless: getBoolValue(student.isHomeless),
            isMigrant: getBoolValue(student.isMigrant),
            isRunaway: getBoolValue(student.isRunaway),
            demographics: {
                isNativeAmerican: getBoolValue(student.demographics.isNativeAmerican),
                isAsian: getBoolValue(student.demographics.isAsian),
                isBlack: getBoolValue(student.demographics.isBlack),
                isPacificIslander: getBoolValue(student.demographics.isPacificIslander),
                isWhite: getBoolValue(student.demographics.isWhite),
                isHispanicLatino: getBoolValue(student.demographics.isHispanicLatino)
            },
            firstName: student.firstName,
            middleName: student.middleName,
            lastName: student.lastName,
            suffix: student.suffix,
            school: student.school,
            grade: student.grade
        });
    });
        
        return students;
}
    
function getStudentSources(sourcePath) {
    sources = {
        job: {
            has: getBoolValue(sourcePath.job.has),
            lineItems: getLineItems(sourcePath.job.lineItems)
        },
        socialSecurity: {
            has: getBoolValue(sourcePath.socialSecurity.has),
            lineItems: getLineItems(sourcePath.socialSecurity.lineItems)
        },
        friendsFamily: {
            has: getBoolValue(sourcePath.friendsFamily.has),
            lineItems: getLineItems(sourcePath.friendsFamily.lineItems)    
        },
        pensionAnnuityTrust: {
            has: getBoolValue(sourcePath.pensionAnnuityTrust.has),
            lineItems: getLineItems(sourcePath.pensionAnnuityTrust.lineItems)
        },
        other: {
            has: getBoolValue(sourcePath.other.has),
            lineItems: getLineItems(sourcePath.other.lineItems)
        }
    };

    return sources;
}

function getOtherChildren(otherChildrenArray) {
    otherChildren = [];

    otherChildrenArray.forEach((child) => {
        otherChildren.push({
            id: child.id,
            isChild: getBoolValue(child.isChild),
            incomeTypes: {
                child: {
                    isApplicable: getBoolValue(child.incomeTypes.child.isApplicable),
                    sources: getStudentSources(child.incomeTypes.child.sources)
                }
            },
            firstName: child.firstName,
            middleName: child.middleName,
            lastName: child.lastName,
            suffix: child.suffix,
            isFoster: child.isFoster
        });
    });

    return otherChildren;
}

function getAdults(adultsArray) {
    let adults = [];

    adultsArray.forEach((adult) => {
        adults.push({
            id: adult.id,
            isAdult: getBoolValue(adult.isAdult),
            isAttestor: getBoolValue(adult.isAttestor),
            incomeTypes: {
                military: {
                    isApplicable: getBoolValue(adult.incomeTypes.military.isApplicable),
                    isDeployed: getBoolValue(adult.incomeTypes.military.isDeployed),
                    sources: {
                        basic: {
                            has: getBoolValue(adult.incomeTypes.military.sources.basic.has),
                            lineItems: getLineItems(adult.incomeTypes.military.sources.basic.lineItems)
                        },
                        cashBonus: {
                            has: getBoolValue(adult.incomeTypes.military.sources.cashBonus.has),
                            lineItems: getLineItems(adult.incomeTypes.military.sources.cashBonus.lineItems)
                        },
                        allowance: {
                            has: getBoolValue(adult.incomeTypes.military.sources.allowance.has),
                            lineItems: getLineItems(adult.incomeTypes.military.sources.allowance.lineItems)
                        }
                    }
                },
                employment: {
                    isApplicable: getBoolValue(adult.incomeTypes.employment.isApplicable),
                    sources: {
                        salaryWages: {
                            has: getBoolValue(adult.incomeTypes.employment.sources.salaryWages.has),
                            lineItems: getLineItems(adult.incomeTypes.employment.sources.salaryWages.lineItems)
                        },
                        tips: {
                            has: getBoolValue(adult.incomeTypes.employment.sources.tips.has),
                            lineItems: getLineItems(adult.incomeTypes.employment.sources.tips.lineItems)
                        },
                        commission: {
                            has: getBoolValue(adult.incomeTypes.employment.sources.commission.has),
                            lineItems: getLineItems(adult.incomeTypes.employment.sources.commission.lineItems)
                        },
                        cashBonus: {
                            has: getBoolValue(adult.incomeTypes.employment.sources.cashBonus.has),
                            lineItems: getLineItems(adult.incomeTypes.employment.sources.cashBonus.lineItems)
                        },
                        selfEmployment: {
                            has: getBoolValue(adult.incomeTypes.employment.sources.selfEmployment.has),
                            lineItems: getLineItems(adult.incomeTypes.employment.sources.selfEmployment.lineItems)
                        }
                    }
                },
                publicAssistance: {
                    isApplicable: getBoolValue(adult.incomeTypes.publicAssistance.isApplicable),
                    ssi: {
                        has: getBoolValue(adult.incomeTypes.publicAssistance.sources.ssi.has),
                        lineItems: getLineItems(adult.incomeTypes.publicAssistance.sources.ssi.lineItems)
                    },
                    stateLocal: {
                        has: getBoolValue(adult.incomeTypes.publicAssistance.sources.stateLocal.has),
                        lineItems: getLineItems(adult.incomeTypes.publicAssistance.sources.stateLocal.lineItems)
                    }
                },
                spousal: {
                    isApplicable: getBoolValue(adult.incomeTypes.spousal.isApplicable),
                    sources: {
                        alimony: {
                            has: getBoolValue(adult.incomeTypes.spousal.sources.alimony.has),
                            lineItems: getLineItems(adult.incomeTypes.spousal.sources.alimony.lineItems)
                        },
                        childSupport: {
                            has: getBoolValue(adult.incomeTypes.spousal.sources.childSupport.has),
                            lineItems: getLineItems(adult.incomeTypes.spousal.sources.childSupport.lineItems)
                        }
                    }
                },
                unemployment: {
                    isApplicable: getBoolValue(adult.incomeTypes.unemployment.isApplicable),
                    sources: {
                        unemployment: {
                            has: getBoolValue(adult.incomeTypes.unemployment.sources.unemployment.has),
                            lineItems: getLineItems(adult.incomeTypes.unemployment.sources.unemployment.lineItems)
                        },
                        workersComp: {
                            has: getBoolValue(adult.incomeTypes.unemployment.sources.workersComp.has),
                            lineItems: getLineItems(adult.incomeTypes.unemployment.sources.workersComp.lineItems)
                        },
                        strike: {
                            has: getBoolValue(adult.incomeTypes.unemployment.sources.strike.has),
                            lineItems: getLineItems(adult.incomeTypes.unemployment.sources.strike.lineItems)
                        },
                        ssdi: {
                            has: getBoolValue(adult.incomeTypes.unemployment.sources.ssdi.has),
                            lineItems: getLineItems(adult.incomeTypes.unemployment.sources.ssdi.lineItems)
                        },
                        veteran: {
                            has: getBoolValue(adult.incomeTypes.unemployment.sources.veteran.has),
                            lineItems: getLineItems(adult.incomeTypes.unemployment.sources.veteran.lineItems)
                        },
                        retirment: {
                            isApplicable: getBoolValue(adult.incomeTypes.unemployment.isApplicable),
                            sources: {
                                socialSecurity: {
                                    has: getBoolValue(adult.incomeTypes.retirement.sources.socialSecurity.has),
                                    lineItems: getLineItems(adult.incomeTypes.retirement.sources.socialSecurity.lineItems)
                                },
                                privatePension: {
                                    has: getBoolValue(adult.incomeTypes.retirement.sources.privatePension.has),
                                    lineItems: getLineItems(adult.incomeTypes.retirement.sources.privatePension.lineItems)
                                }
                            }
                        },
                        other: {
                            isApplicable: getBoolValue(adult.incomeTypes.other.isApplicable),
                            sources: {
                                regularCashPayments: {
                                    has: getBoolValue(adult.incomeTypes.other.sources.regularCashPayments.has),
                                    lineItems: getLineItems(adult.incomeTypes.other.sources.regularCashPayments.lineItems)
                                },
                                rentalIncome: {
                                    has: getBoolValue(adult.incomeTypes.other.sources.rentalIncome.has),
                                    lineItems: getLineItems(adult.incomeTypes.other.sources.rentalIncome.lineItems)
                                },
                                earnedInterest: {
                                    has: getBoolValue(adult.incomeTypes.other.sources.earnedInterest.has),
                                    lineItems: getLineItems(adult.incomeTypes.other.sources.earnedInterest.lineItems)
                                },
                                investmentIncome: {
                                    has: getBoolValue(adult.incomeTypes.other.sources.investmentIncome.has),
                                    lineItems: getLineItems(adult.incomeTypes.other.sources.investmentIncome.lineItems)
                                },
                                annuity: {
                                    has: getBoolValue(adult.incomeTypes.other.sources.annuity.has),
                                    lineItems: getLineItems(adult.incomeTypes.other.sources.annuity.lineItems)
                                },
                                other: {
                                    has: getBoolValue(adult.incomeTypes.other.sources.other.has),
                                    lineItems: getLineItems(adult.incomeTypes.other.sources.other.lineItems)
                                }
                            }
                        }
                    },
                }
            },
            firstName: adult.firstName,
            middleName: adult.middleName,
            lastName: adult.lastName,
            suffix: adult.suffix
        })
    })
    return adults;
}

function getLineItems(itemArray) {
    let items = [];

    itemArray.forEach((item) => {
        items.push({
            amount: item.amount,
            frequency: item.frequency,
            hourlyHours: item.hourlyHours,
            hourlyPeriod: item.hourlyPeriod,
            id: item.id
        });
    });

    return items;
}

function getBoolValue(value) {
    return value === null ? false : value;
}