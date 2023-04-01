import { Calendar, momentLocalizer } from 'react-big-calendar';
import styled from 'styled-components';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import supabase from '../utils/supabase';
import { useEffect, useState } from 'react';

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

const localizer = momentLocalizer(moment);

const CalendarContainer = styled.div`
  margin-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
`;

export default function MyCalendar() {
  const [schedule, setSchedule] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('schedule').select();

      if (error) {
        console.log(error);
      } else {
        setSchedule(data);
      }
    };

    fetchData();

    const channel = supabase
      .channel('Schedule')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'schedule' },
        (payload) => {
          setSchedule(payload.new, ...schedule);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [schedule]);

  const myEventsList = schedule?.map((el) => ({
    start: moment(el.start).add(1, 'days').toDate(),
    end: moment(el.end).add(2, 'days').toDate(),
    title: `${el.name}(${el.type})`,
  }));

  return (
    <CalendarContainer>
      <Calendar
        localizer={localizer}
        style={{ height: '83vh' }}
        events={myEventsList}
        messages={lang.ko}
        culture='ko'
        views={['month', 'week', 'day']}
      />
    </CalendarContainer>
  );
}
