import React, { ReactNode, useState, useContext, createContext, useMemo, Dispatch, SetStateAction  } from "react";
import { FinancialData } from "src/types/app.types";

type onePropertyType = {
    // id: string,
    propertyName: string,
    propertyLocation: string,
    propertyState: string,
    userId: string,
    occupationalStatus: string
    propertyId: string
}
type propertytype = {
    property: onePropertyType,
    setProperty: Dispatch<SetStateAction<onePropertyType>>
    financials: FinancialData,
    setFinancials: Dispatch<SetStateAction<FinancialData>>
}
const initialPropertyState: onePropertyType = {
    // id: '',
    propertyName: '',
    propertyLocation: '',
    userId: '',
    occupationalStatus: '',
    propertyState: '',
    propertyId: ''

}
const initialFinancialState: FinancialData = {
    userId: '',
    walletBalance: 0,
    totalInflow: 0,
    totalOutflow: 0,
    inflowHistory: [],
    outflowHistory: []
}
const PropertyContext = createContext<propertytype>({
    property: initialPropertyState,
    setProperty: () => null,
    financials: initialFinancialState,
    setFinancials: () => null
})

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
    const [property, setProperty] = useState<onePropertyType>(initialPropertyState)
    const [financials, setFinancials] = useState<FinancialData>(initialFinancialState)
    const value = useMemo(() => ({
        property,
        setProperty,
        financials,
        setFinancials
    }), [property, setProperty, financials, setFinancials])

    return <PropertyContext.Provider value={value}>
        { children }
        </PropertyContext.Provider>
}

export const useProperties = () => useContext(PropertyContext)