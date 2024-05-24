import React, { ReactNode } from "react";
import {
  useState,
  useContext,
  createContext,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";

type oneUnitType = {
  unitId: string;
  occupyingStatus: boolean;
  otherCharges: null | number | string;
  unitAgreementCharge: null | number | string;
  unitCommissionCharge: null | number | string;
  unitLegalFee: null | number | string;
  unitLegalCharge: null | number | string
  unitName: string;
  unitRent: number | string;
  unitServiceCharge: number | string;
  unitOtherCharges: number;
  unitType: {
    category?: string;
    description?: string;
    id: number | string;
  };
};
type unittype = {
  oneUnit: oneUnitType;
  setOneUnit: Dispatch<SetStateAction<oneUnitType>>;
};
const initialUnitState: oneUnitType = {
  unitId: "",
  occupyingStatus: false,
  otherCharges: null || 0,
  unitAgreementCharge: null || 0,
  unitCommissionCharge: null || 0,
  unitLegalFee: null || 0,
  unitLegalCharge: null || 0,
  unitName: "",
  unitRent: 0,
  unitServiceCharge: 0,
  unitOtherCharges: 0,
  unitType: {
    category: "",
    description: "",
    id: 1,
  },
};
const UnitContext = createContext<unittype>({
  oneUnit: initialUnitState,
  setOneUnit: () => null,
});

export const UnitProvider = ({ children }: { children: ReactNode }) => {
  const [oneUnit, setOneUnit] = useState<oneUnitType>(initialUnitState);
  const value = useMemo(
    () => ({
      oneUnit,
      setOneUnit,
    }),
    [oneUnit, setOneUnit]
  );

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
};

export const useUnit = () => useContext(UnitContext);
