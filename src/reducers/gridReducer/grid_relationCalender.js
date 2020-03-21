import { CREATE_CALENDER_ARRAY } from '../../actions/index';

const calenderArray = (state = [], action) => {
  switch (action.type) {
    case CREATE_CALENDER_ARRAY:
      /* カレンダーの大枠の処理 */
      let hasOnlyDayArray = []; // カレンダーの大枠の配列

      /* はじめに曜日だけ配列に格納 */
      const dayArray = ['日', '月', '火', '水', '木', '金', '土'];
      dayArray.forEach(val => {
        let obj = { day: `${val}`, date: null };
        hasOnlyDayArray.push(obj);
      });

      /* 今月 最初の曜日を取得 */
      const currentMonthFisrtDayIndex = new Date(
        action.year,
        action.month - 1,
        1
      ).getDay(); // 表示してる月の初日のindex
      const currentMonthFisrtDay = dayArray[currentMonthFisrtDayIndex];

      /*
      currentMonthFisrtDayを基準に
      曜日だけ(date: null)を持つオブジェクトを格納してる配列(dayFirstBeforeArray)
      曜日と日付を持つオブジェクトを格納してる配列(dayFirstAfterArray)
      に切り分ける
      */
      const dayFirstObj = hasOnlyDayArray.find(
        val => val.day === currentMonthFisrtDay
      );
      const dayFirstIndex = hasOnlyDayArray.indexOf(dayFirstObj);

      /*
      今月の末日を基に今月の日付の配列を作成
      dayFirstAfterArray(今月の１日以降)に対する処理
      */
      const dayFirstAfterArray = hasOnlyDayArray.slice(dayFirstIndex);
      const currentLastDate = new Date(action.year, action.month, 0).getDate(); // 今月の末日
      const dayAllArray = [...Array(currentLastDate).keys()].map(i => ++i);
      dayAllArray.forEach(date => {
        /*
       date: nullの要素がなくなった時
       新たにオブジェクトを作成し配列に格納する
       */
        const judgment = dayFirstAfterArray.some(val => val.date === null);
        if (!judgment) {
          let obj = {
            day: '',
            date,
            year: action.year,
            month: action.month,
          };
          dayFirstAfterArray.push(obj);
          return;
        }
        let dateNullObj = dayFirstAfterArray.find(val => val.date === null);
        Object.assign(dateNullObj, {
          date,
          year: action.year,
          month: action.month,
        });
      });

      /*
      先月の末日を基に配列を作成
      dayFirstBeforeArray(今月の１日以前)と
      先月最後の日曜日との差分日数を出して処理
      */
      const dayFirstBeforeArray = hasOnlyDayArray.slice(0, dayFirstIndex);
      const lastMonthLastDate = new Date(
        action.year,
        action.month - 1,
        0
      ).getDate(); // 先月の末日

      const differenceDays_lastMonthLastSaturday_currenMonthFirstDay =
        lastMonthLastDate - (dayFirstBeforeArray.length - 1);
      const differenceDays = [...Array(dayFirstBeforeArray.length).keys()].map(
        i => i + differenceDays_lastMonthLastSaturday_currenMonthFirstDay
      );
      differenceDays.forEach(date => {
        let dateNullObj = dayFirstBeforeArray.find(val => val.date === null);
        Object.assign(dateNullObj, {
          date,
          year: action.month === 1 ? action.year - 1 : action.year,
          month: action.month === 1 ? 12 : action.month - 1,
        });
      });

      /* 今月末から来月の第一土曜日の差分を取得 */
      // 表示月の来月の初日のindex
      const nextMonthFisrtDayIndex = new Date(
        action.year,
        action.month,
        1
      ).getDay();
      let differenceDays_nextMonthFirstSaturday_currenMonthLastDay = dayArray.slice(
        nextMonthFisrtDayIndex
      );

      if (
        differenceDays_nextMonthFirstSaturday_currenMonthLastDay.length === 7
      ) {
        differenceDays_nextMonthFirstSaturday_currenMonthLastDay = [];
      } else {
        differenceDays_nextMonthFirstSaturday_currenMonthLastDay = differenceDays_nextMonthFirstSaturday_currenMonthLastDay.map(
          (day, index) => {
            let obj = {
              day: '',
              date: index + 1,
              year: action.month === 12 ? action.year + 1 : action.year,
              month: action.month === 12 ? 1 : action.month + 1,
            };
            return obj;
          }
        );
      }
      const displayCalenderArray = dayFirstBeforeArray.concat(
        dayFirstAfterArray,
        differenceDays_nextMonthFirstSaturday_currenMonthLastDay
      );
      /* CalenderArea.jsでイベント(タイトルと日時)を追加したら下の処理を発火
        (action.targetDateInfo === undefined) => targetDateInfoは Modal.jsから送られてくる
      */
      const registerEventArray = localStorage.getItem(
        `calenderData Year ${action.year} : Month ${action.month}`
      );
      // RegisteredTitleDateModalでdispatchされたら下の処理を発火
      if (action.registeredTitleInfoObj !== undefined) {
        const deleteTitleObj = state.find(
          val =>
            val.year === action.registeredTitleInfoObj.registeredYear &&
            val.month === action.registeredTitleInfoObj.registeredMonth &&
            val.date === action.registeredTitleInfoObj.registeredDate
        );
        const deleteTitleIndex = deleteTitleObj.titleArray.indexOf(
          action.registeredTitleInfoObj.registeredTitle
        );
        deleteTitleObj.titleArray.splice(deleteTitleIndex, 1);
        localStorage.setItem(
          `calenderData Year ${state[5].year} : Month ${state[5].month}`,
          JSON.stringify(state)
        );
        return state;
      }
      if (action.targetDateInfo === undefined)
        /* localStorageに現在表示してる月の配列があれば該当の配列を表示
          そうでなければ、上記の処理で作成したdisplayCalenderArrayを表示
        */
        return JSON.parse(registerEventArray) === null
          ? displayCalenderArray
          : JSON.parse(registerEventArray);
      let targetAdd_title_dateTimeObj = state.find(
        val =>
          val.year === action.targetDateInfo.year &&
          val.month === action.targetDateInfo.month &&
          val.date === action.targetDateInfo.date
      );
      // 一意の日時に初期イベントを登録する場合の処理
      if (targetAdd_title_dateTimeObj.titleArray === undefined) {
        Object.assign(targetAdd_title_dateTimeObj, {
          titleArray: [action.title],
        });
      } else {
        // 既にイベント登録済の日時に2つめ以降のイベントを追加する処理
        targetAdd_title_dateTimeObj.titleArray = [
          ...targetAdd_title_dateTimeObj.titleArray,
          action.title,
        ];
      }
      // イベント登録した配列をlocalStorageに保存
      if (state.some(val => val.titleArray)) {
        localStorage.setItem(
          `calenderData Year ${state[5].year} : Month ${state[5].month}`,
          JSON.stringify(state)
        );
      }
      return state;
    default:
      return state;
  }
};

export default calenderArray;
