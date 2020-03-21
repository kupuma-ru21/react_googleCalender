import React, { useState, useContext } from 'react';

import format from 'date-fns/format';
import frLocale from 'date-fns/locale/ja';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import AppContext from '../contexts/AppContext';

class LocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date) {
    return format(date, 'yyyy年M月d日', { locale: this.locale });
  }
}

const ModalInputDisplayDate = () => {
  const { state } = useContext(AppContext);
  const gridClickDateInfo = state.gridReducer.gridClickDateInfo;
  const [selectedDate, handleDateChange] = useState(
    new Date(
      gridClickDateInfo.year,
      gridClickDateInfo.month - 1,
      gridClickDateInfo.date
    )
  );
  // material UIカレンダーの曜日表示順を日曜日からに変更 (node_modules/date-fns/locale/ja/index.js)
  frLocale.options.weekStartsOn = 0;
  frLocale.options.firstWeekContainsDate = 1;
  return (
    <MuiPickersUtilsProvider utils={LocalizedUtils} locale={frLocale}>
      <DatePicker
        format="yyyy年M月d日"
        value={selectedDate}
        onChange={handleDateChange}
        disableToolbar="false"
        cancelLabel=""
        style={{ width: 330, paddingLeft: 20, marginBottom: 20 }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default ModalInputDisplayDate;
