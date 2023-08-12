import React, { ReactNode } from "react";
import { useState, useContext, createContext, useMemo, Dispatch, SetStateAction } from "react";

type onePropertyType = {
    id: string,
    propertyName: string,
    propertyLocation: string,
    propertyState: string,
    userId: string,
    occupationalStatus: string
}
type propertytype = {
    property: onePropertyType,
    setProperty: Dispatch<SetStateAction<onePropertyType>>
}
const initialPropertyState: onePropertyType = {
    id: '',
    propertyName: '',
    propertyLocation: '',
    userId: '',
    occupationalStatus: '',
    propertyState: ''
}
const PropertyContext = createContext<propertytype>({
    property: initialPropertyState,
    setProperty: () => null
})

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
    const [property, setProperty] = useState<onePropertyType>(initialPropertyState)
    const value = useMemo(() => ({
        property,
        setProperty
    }), [property, setProperty])

    return <PropertyContext.Provider value={value}>
        { children }
        </PropertyContext.Provider>
}

export const useProperties = () => useContext(PropertyContext)