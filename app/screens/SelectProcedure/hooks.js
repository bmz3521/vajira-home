import React from "react";
import { getPriceText, getTotalPrice, getProcedureGroup } from "@utils/shared";

const useHooks = (props) => {
    const { navigation } = props;
    const { clinic, quotation } = navigation.state.params;

    const [selectedProcedures, setSelectedProcedures] = React.useState([]);
    const procedureGroup = getProcedureGroup(clinic.Procedures);

    const onSelectedItem = React.useCallback(() => (selected, item) => {
        let newSelectedList = [ ...selectedProcedures ];
        
        if (selected) {
            newSelectedList = selectedProcedures.filter(p => p.id !== item.id);
            newSelectedList.push(item);
        } else {
            newSelectedList = selectedProcedures.filter(p => p.id !== item.id);
        }
        
        setSelectedProcedures(newSelectedList);
    }, [selectedProcedures]);

    const onSuggest = React.useCallback(() => item => {
        onSelectedItem()(true, {
            id: item.id,
            name: item.name,
            minPrice: item.minPrice || item.maxPrice,
            maxPrice: item.maxPrice,
            price: getPriceText(item) || item.maxPrice + "",
        });
    }, [onSelectedItem]);

    const onNext = React.useCallback(() => () => {
        navigation.navigate("MedicalQueryForm", {
            clinic: clinic,
            quotation: Object.assign({}, quotation, {
                procedures: selectedProcedures,
                totalPrice: getTotalPrice(selectedProcedures),
            })
        })
    }, [navigation, clinic, quotation, selectedProcedures])
    

    return {
        timeFormat: quotation.timeFormat,
        procedureGroup,
        selectedProcedures,
        events: {
            onSelectedItem,
            onSuggest,
            onNext,
        },
    }
}

export { useHooks }