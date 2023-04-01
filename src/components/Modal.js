import styled from 'styled-components';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import * as locales from 'react-date-range/dist/locale';
import supabase from '../utils/supabase';

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
`;

const ModalSection = styled.section`
  margin-bottom: 20px;
`;

const FormBtn = styled.button`
  background-color: rgb(61, 145, 255);
  color: white;
  border-radius: 9999px;
  padding: 5px 15px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
`;

const TypeInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  transition: 0.2s all linear;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  border: 2px solid #999;
  &:checked {
    border: 6px solid rgb(61, 145, 255);
  }
`;

const NameInput = styled.input`
  outline: none;
  margin-left: 10px;
  padding: 3px;
  font-size: 1rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

export default function Modal({ setShowModal }) {
  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: 'selection' },
  ]);
  const [selectedOpt, setSelectedOpt] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from('schedule').insert({
      start: date[0].startDate,
      end: date[0].endDate,
      name,
      type: selectedOpt,
    });

    if (error) {
      console.log(error);
    } else {
      setShowModal(false);
    }
  };

  return (
    <div>
      <Overlay onClick={() => setShowModal(false)} />
      <ModalForm onSubmit={handleSubmit}>
        <Label>
          이름
          <NameInput value={name} onChange={(e) => setName(e.target.value)} />
        </Label>
        <ModalSection>
          <Label>
            연차
            <TypeInput
              type='radio'
              value='연차'
              checked={selectedOpt === '연차'}
              onChange={(e) => setSelectedOpt(e.target.value)}
            />
          </Label>{' '}
          <Label>
            당직
            <TypeInput
              type='radio'
              value='당직'
              checked={selectedOpt === '당직'}
              onChange={(e) => setSelectedOpt(e.target.value)}
            />
          </Label>
        </ModalSection>
        <DateRange
          locale={locales.ko}
          minDate={new Date()}
          ranges={date}
          onChange={(ranges) => setDate([ranges.selection])}
          editableDateInputs={true}
        />
        <FormBtn type='submit'>신청</FormBtn>
      </ModalForm>
    </div>
  );
}
