import * as React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { View, Text } from '../../Themed';
import { Platform, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colorsConstants from 'src/constants/colors.constants';
import useColorScheme from "src/hooks/useColorScheme";


type props = {
    placeholder?: string
}

export const DatePicker = ({placeholder}: props) => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState('')

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        setSelectedDate(currentDate)
    };

 
    const showDatepicker = () => {
        setShow(true)
    };

    const theme = useColorScheme();

    return (
        <View style={styles.container}>
            <Text style={[styles.placeholder, {color: colorsConstants.light.shadowText}]}>{!selectedDate ? placeholder : date.toLocaleDateString()}</Text>
            <Ionicons name="calendar-sharp" size={33} color="black" onPress={showDatepicker} style={[styles.icon, {color: colorsConstants[theme].shadowText}]} />

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    onChange={onChange}
                />
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 70,
        backgroundColor: colorsConstants.light.lighterGrey,
        borderRadius: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 12,
    },
    icon: {
        // alignSelf: 'flex-end',
        
    },
    placeholder:{
      
    }
})