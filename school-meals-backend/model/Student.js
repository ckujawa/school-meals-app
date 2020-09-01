var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

modules.export = mongoose.model("Student", StudentSchema);