import {useCallback, useState} from "react";
import {CompanyInformationDTO} from "../../../types/companyInformation";
import {getCompanyInformation} from "../../../slice/companyInformationSlice";
import {useDispatch} from "react-redux";

export function useCompanyInformationGetter() {
    const dispatch = useDispatch<any>();
    const [companyInformation, setCompanyInformation] = useState<CompanyInformationDTO[]>();

    const getCompanyInfo = useCallback(async () => {
            const result: CompanyInformationDTO[] = await dispatch(
                getCompanyInformation({country: "", location: ""})
            ).unwrap();
            setCompanyInformation(result);
        },
        [dispatch
            // , selectedCategory, selectedLabel
        ]
    );
    return ({
        getCompanyInfo,
        companyInformation
    });
}