var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const LineItemSchema = new Schema ({
    amount: Number,
    frequency: String,
    hourlyHours: Number,
    hourlyPeriod: String,
    id: String
});

const IncomeSourceSchema = new Schema({
    has: Boolean,
    lineItems: [LineItemSchema]
});

const StudentSchema = new Schema({
    id: String,
    isChild: Boolean,
    incomeTypes: {
        child: {
            isApplicable: Boolean,
            sources: {
                job: { IncomeSourceSchema },
                socialSecurity: { IncomeSourceSchema },
                friendsFamily: { IncomeSourceSchema },
                pensionAnnuityTrust: { IncomeSourceSchema },
                other: { IncomeSourceSchema }
            }
        }
    },
    isStudent: Boolean,
    isFoster: Boolean,
    isHomeless: Boolean,
    isMigrant: Boolean,
    isRunaway: Boolean,
    demographics: {
        isNativeAmerican: Boolean,
        isAsian: Boolean,
        isBlack: Boolean,
        isPacificIslander: Boolean,
        isWhite: Boolean,
        isHispanicLatino: Boolean
    },
    firstName: String,
    middleName: String,
    lastName: String,
    suffix: String,
    school: String,
    grade: String
});

const ChildSchema = new Schema({
    id: String,
    isChild: Boolean,
    incomeTypes: {
        child: {
            isApplicable: Boolean,
            sources: {
                job: { IncomeSourceSchema },
                socialSecurity: { IncomeSourceSchema },
                friendsFamily: { IncomeSourceSchema },
                pensionAnnuityTrust: { IncomeSourceSchema },
                other: { IncomeSourceSchema }
            }
        }
    },
    firstName: String,
    middleName: String,
    lastName: String,
    suffix: String,
    isFoster: Boolean
});

const AdultSchema = new Schema(
{

    id: String,
    isAdult: Boolean,
    isAttestor: Boolean,
    incomeTypes: {
    military: {
        isApplicable: Boolean,
        isDeployed: Boolean,
        sources: {
            basic: {IncomeSourceSchema},
            cashBonus: {IncomeSourceSchema},
            allowance: {IncomeSourceSchema}
        }
    },
    employment: {
        isApplicable: Boolean,
        sources: {
            salaryWages: {IncomeSourceSchema},
            tips: {IncomeSourceSchema},
            commission: {IncomeSourceSchema},
            cashBonus: {IncomeSourceSchema},
            selfEmployment: {IncomeSourceSchema}
        }
    },
    publicAssistance: {
        isApplicable: Boolean,
        sources: {
            ssi: {IncomeSourceSchema},
            stateLocal: {IncomeSourceSchema}
        }
    },
    spousal: {
        isApplicable: Boolean,
        sources: {
            alimony: {IncomeSourceSchema},
            childSupport: {IncomeSourceSchema}
        }
    },
    unemployment: {
        isApplicable: Boolean,
        sources: {
            unemployment: {IncomeSourceSchema},
            workersComp: {IncomeSourceSchema},
            strike: {IncomeSourceSchema},
            ssdi: {IncomeSourceSchema},
            veteran: {IncomeSourceSchema}
        }
    },
    retirement: {
        isApplicable: false,
        sources: {
            socialSecurity: {IncomeSourceSchema},
            privatePension: {IncomeSourceSchema}
        }
    },
    other: {
        isApplicable: Boolean,
        sources: {
            regularCashPayments: {IncomeSourceSchema},
            rentalIncome: {IncomeSourceSchema},
            earnedInterest: {IncomeSourceSchema},
            investmentIncome: {IncomeSourceSchema},
            annuity: {IncomeSourceSchema},
            other: {IncomeSourceSchema}
        }
    },
},
    firstName: String,
    middleName: String,
    lastName: String,
    suffix: String
});
        
var appDataSchema = new Schema(
    {
        students: [StudentSchema],
        assistancePrograms: {
            items: [
                {
                    isApplicable: Boolean,
                    id: String,
                    name: String,
                    accronym: String,
                    caseNumber: String
                }
            ]
        },
        otherChildren: [ChildSchema],
        adults: [AdultSchema],
        certifiedCorrect: Boolean,
        electToProvideIncome: Boolean,
        attestation: {
            date: {type: Date, default: Date.now}
        },
        contact: {
            email: String,
            address1: String,
            address2: String,
            city: String,
            state: String,
            phone: String,
            zip: String
        },
        signature: {
            noSsn: {Boolean, default: false},
            ssnLastFour: String
        }
    });

module.exports = mongoose.model("AppData", appDataSchema);