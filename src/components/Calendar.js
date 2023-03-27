import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ko from 'date-fns/locale/ko';
import styled from 'styled-components';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  ko: ko,
};

const lang = {
  ko: {
    week: ' 주 단위',
    day: '일 단위',
    month: '월 단위',
    previous: '이전',
    next: '다음',
    today: '오늘',
    agenda: '일정',

    showMore: (total) => `+${total} 더 보기`,
  },
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// const myEventsList = [{}];

const CalendarContainer = styled.div`
  margin-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
`;

export default function MyCalendar() {
  return (
    <CalendarContainer>
      <Calendar
        localizer={localizer}
        style={{ height: '83vh' }}
        // events={myEventsList}
        messages={lang.ko}
        culture='ko'
      />
    </CalendarContainer>
  );
}
