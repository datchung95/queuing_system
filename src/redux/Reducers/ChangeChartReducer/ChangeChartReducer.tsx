import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ChangeChartState {
    changeSelect: string;
}

const initialState: ChangeChartState = {
    changeSelect: "Ngày"
}

const ChangeChartReducer = createSlice({
    name: "ChangeChartReducer",
    initialState,
    reducers: {
        ChangeChart: (state, action: PayloadAction<string>) => {
            state.changeSelect = action.payload;
        }
    }
});

export const { ChangeChart } = ChangeChartReducer.actions

export default ChangeChartReducer.reducer