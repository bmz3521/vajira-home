import moment from "moment";

export const getPriceText = (procedure) => {
    let price = 'Please Enquire';
    if (procedure.minPrice === null) {
        price = procedure.maxPrice;
    } else if (procedure.minPrice !== 0 && procedure.maxPrice !== 0) {
        if (procedure.minPrice === procedure.maxPrice) {
            price = procedure.minPrice;
        }
        else {
            price = procedure.minPrice + ' - ' + procedure.maxPrice;
        }
    }
    return price;
}

export const getTotalPrice = (procedures) => {
    return procedures.reduce((prev, current) => {
        const newData = Object.assign({}, prev);
        newData.min += current.minPrice;
        newData.max += current.maxPrice;
        
        if (newData.min !== 0 && newData.max !== 0) {
            if (newData.min === newData.max) {
                newData.total = newData.max + "";
            } else {
                newData.total = newData.min + " - " + newData.max;
            }
        }
        return newData;
    }, {min: 0, max: 0, total: "Please Enquire" }).total;
}

export const getProcedureGroup = (procedures) => {
    const procedureGroup = {};

    procedures.forEach(procedure => {
        let price = 'Please Enquire';
        if (procedure.minPrice === null) {
            price = procedure.maxPrice;
        } else if (procedure.minPrice !== 0 && procedure.maxPrice !== 0) {
            if (procedure.minPrice === procedure.maxPrice) {
                price = procedure.minPrice;
            } else {
                price = procedure.minPrice + ' - ' + procedure.maxPrice;
            }
        }
        const group = procedure.specialitiesName;
        const modifiedProcedure = Object.assign({}, procedure, { price });

        if (procedureGroup[group]) {
            const { procedures } = procedureGroup[group];
            procedures.push(modifiedProcedure);
        } else {
            procedureGroup[group] = {
                name: group,
                procedures: [ modifiedProcedure ],
            };
        }
    });

    return procedureGroup;
}

export const getStatusText = (status) => {
    switch(status) {
        case "PATIENT_DRAFT":
            return "-";
        case "PATIENT_FINISH_QUOTATION":
            return "Upcoming";
        case "PATIENT_FINISH_FORM_SUBMISSION":
            return "Upcoming";
        case "PATIENT_APPOINTMENT_TODAY":
            return "Today";
        case "CLINIC_CONFIRM":
            return "Ongoing";
        case "CLINIC_DECLINE":
            return "Cancelled";
        case "CLINIC_CONFIRM_ADMIT":
            return "Admitted";
        case "PATIENT_REVIEW":
            return "Reviewed";
        case "CLINIC_ACCEPT_REVIEW":
            return "Review verified";
        case "CLINIC_REJECT_REVIEW":
            return "Review rejected";
        case "CLINIC_FINISH_WORKFLOW":
            return "Complete";
        case "JUNK":
            return "-";
    }
}

export const getTimeText = (time, format = 'll') => {
    if (!time) return "-";
    return moment(time).format(format);
}

export const getPatientInfo = (booking) => {
  return Object.assign(
    {},
    booking.patient && booking.patient.userInformation,
    booking.formInfo,
    booking.patientInfo,
  );
}