import React, { useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';
import { useLocation, useParams } from "react-router-dom";
import placeData from "../data/places.json";
import loungeData from "../data/lounges2.json"
import placeData2 from "../data/places2.json"
import "../style/lounge.css";
import { LuMapPin } from "react-icons/lu";
import { ReactComponent as SeatIcon } from '../img/seat.svg';
import { PiChairLight } from "react-icons/pi";

const getSpaceName = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const spaceName = urlParams.get('spaceName');
  return spaceName;
}

// Get one space data
async function fetchLoungeData(spaceName) {
  const url = `/data/getSeats?spaceName=${spaceName}`
  const response = await fetch(url);
  console.log(response);
  const data = await response.json();
  return data;
}

// Get space list Data
async function findAddress(name) {
  const response = await fetch("/data/getSpace/");
  const data = await response.json();
  const result = data.find(item => item.name === name);
  return result ? result.address : null;
}

// Just for offline testing
const findAddTemp = (name) => {
  const result = loungeData.find(item => item.name === name);
  return result ? result.address : null;
}

const Header = ({ available, reserved, occupied }) => {
  const totalSeats = available + reserved + occupied;
  const space = getSpaceName();
  const temp = findAddTemp(space); // This is from JSon
  console.log(space);

  return (
    <header className="header">
      <h1>{space}</h1>
      <div className="header-info">
        <LuMapPin className="icon map" size="21" />
        <p className="num-text">{temp}</p>
      </div>
      <div className="header-info seat-status">
        <PiChairLight className="icon person" size="23" />
        <span className="num-text">{`${available}/${totalSeats} `}</span>
      </div>
    </header>
  );
};

const StatusIndicator = () => {
  return (
    <div className="status-indicator">
      <div className="status-item">
        <span className="status-dot available"></span>
        <span className="status-text">Available</span>
      </div>
      <div className="status-item">
        <span className="status-dot reserved"></span>
        <span className="status-text">Reserved</span>
      </div>
      <div className="status-item">
        <span className="status-dot occupied"></span>
        <span className="status-text">Occupied</span>
      </div>
    </div>
  );
};

const Lounge = () => {
  const [seatInfo, setSeatInfo] = useState({});

  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const isPortrait = useMediaQuery({ orientation: 'portrait' });

  // Server 에서 로드하기 - 박재윤
  useEffect(() => {
  
    const fetchData = async () => {
      try {
        const fetchedData = await fetchLoungeData(getSpaceName());
        console.log(fetchedData);
        setSeatInfo(fetchedData);
      } catch (error) {
        console.error("Error fetching lounge data:", error);
      }
    };

    fetchData();
  }, []);
  
  const renderSeatRows = () => {
    const spaceName = getSpaceName();
    /*const seatLayout = [
      [
        { id: 'empty' },
        { id: 'empty' },
        { id: '6', chairPosition: 'below' },
        { id: '7', chairPosition: 'below' },
        { id: '8', chairPosition: 'below' },
        { id: '9', chairPosition: 'below' },
        { id: '10', chairPosition: 'below' }],
      [
        { id: '5', chairPosition: 'right' },
        { id: 'empty' },
        { id: 'empty' },
        { id: 'empty' },
        { id: 'empty' },
        { id: 'empty' },
        { id: 'empty' }],
      [
        { id: '4', chairPosition: 'right' },
        { id: 'empty' },
        { id: 'empty' },
        { id: 'empty' },
        { id: 'empty' },
        { id: 'empty' },
        { id: 'empty' }],
      [
        { id: '3', chairPosition: 'right' },
        { id: 'empty' },
        { id: 'empty' },
        { id: '12', chairPosition: 'up' },
        { id: '14', chairPosition: 'up' },
        { id: '16', chairPosition: 'up' },
        { id: '18', chairPosition: 'up' }],
      [
        { id: '2', chairPosition: 'right' },
        { id: 'empty' },
        { id: 'empty' },
        { id: '11', chairPosition: 'below' },
        { id: '13', chairPosition: 'below' },
        { id: '15', chairPosition: 'below' },
        { id: '17', chairPosition: 'below' }],
      [
        { id: '1', chairPosition: 'right' },
        { id: 'empty' },
        { id: 'empty' },
        { id: 'empty' },
        { id: 'empty' },
        { id: 'empty' },
        { id: 'empty' }]
    ];*/

    let seatLayout;

    if (spaceName === 'parksangjo') {
      seatLayout = [
        [
          { id: 'empty' },
          { id: 'empty' },
          { id: '6', chairPosition: 'below' },
          { id: '7', chairPosition: 'below' },
          { id: '8', chairPosition: 'below' },
          { id: '9', chairPosition: 'below' },
          { id: '10', chairPosition: 'below' }],
        [
          { id: '5', chairPosition: 'right' },
          { id: 'empty' },
          { id: 'empty' },
          { id: 'empty' },
          { id: 'empty' },
          { id: 'empty' },
          { id: 'empty' }],
        [
          { id: '4', chairPosition: 'right' },
          { id: 'empty' },
          { id: 'empty' },
          { id: 'empty' },
          { id: 'empty' },
          { id: 'empty' },
          { id: 'empty' }],
        [
          { id: '3', chairPosition: 'right' },
          { id: 'empty' },
          { id: 'empty' },
          { id: '12', chairPosition: 'up' },
          { id: '14', chairPosition: 'up' },
          { id: '16', chairPosition: 'up' },
          { id: '18', chairPosition: 'up' }],
        [
          { id: '2', chairPosition: 'right' },
          { id: 'empty' },
          { id: 'empty' },
          { id: '11', chairPosition: 'below' },
          { id: '13', chairPosition: 'below' },
          { id: '15', chairPosition: 'below' },
          { id: '17', chairPosition: 'below' }],
        [
          { id: '1', chairPosition: 'right' },
          { id: 'empty' },
          { id: 'empty' },
          { id: 'empty' },
          { id: 'empty' },
          { id: 'empty' },
          { id: 'empty' }]
      ];
    } else if (spaceName === 'ebstudyroom1') {
      seatLayout = [
        [
          { id: 'empty' },
          { id: '1', chairPosition: 'left' },
          { id: '2', chairPosition: 'right' },
          { id: 'empty' }],
        [
          { id: 'empty' },
          { id: '3', chairPosition: 'left' },
          { id: '4', chairPosition: 'right' },
          { id: 'empty' }],
        [
          { id: 'empty' },
          { id: '5', chairPosition: 'left' },
          { id: '6', chairPosition: 'right' },
          { id: 'empty' }],
        [
          { id: 'empty' },
          { id: '7', chairPosition: 'left' },
          { id: '8', chairPosition: 'right' },
          { id: 'empty' }]
      ];
    } else if (spaceName === 'haedong') {
      seatLayout = [
        [
          { id: '1', chairPosition: 'right' },
          { id: 'empty' },
          { id: 'empty' },
          { id: '2', chairPosition: 'left' },
          { id: '3', chairPosition: 'right' },
          { id: 'empty' },
          { id: 'empty' },
          { id: '4', chairPosition: 'left' },
          { id: '5', chairPosition: 'right' },
          { id: 'empty' },
          { id: 'empty' },
          { id: '6', chairPosition: 'left' },
          { id: '7', chairPosition: 'right' }],

          [
            { id: '8', chairPosition: 'right' },
            { id: 'empty' },
            { id: 'empty' },
            { id: '9', chairPosition: 'left' },
            { id: '10', chairPosition: 'right' },
            { id: 'empty' },
            { id: 'empty' },
            { id: '11', chairPosition: 'left' },
            { id: '12', chairPosition: 'right' },
            { id: 'empty' },
            { id: 'empty' },
            { id: '13', chairPosition: 'left' },
            { id: '14', chairPosition: 'right' }],

            [
              { id: 'empty' },
              { id: 'empty' },
              { id: 'empty' },
              { id: 'empty' },
              { id: 'empty' },
              { id: 'empty' },
              { id: 'empty' },
              { id: 'empty' },
              { id: 'empty' },
              { id: 'empty' },
              { id: 'empty' },
              { id: 'empty' },
              { id: 'empty' },],
            [
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },],
          [
            { id: 'empty' },
            { id: 'empty' },
            { id: 'empty' },
            { id: '15', chairPosition: 'up' },
            { id: '16', chairPosition: 'up' },
            { id: '17', chairPosition: 'up' },
            { id: '18', chairPosition: 'up' },
            { id: '19', chairPosition: 'up' },
            { id: '20', chairPosition: 'up' },
            { id: 'empty' },
            { id: 'empty' },
            { id: 'empty' },],
            [
              { id: 'empty' },
              { id: 'empty' },
              { id: 'empty' },
              { id: '21', chairPosition: 'below' },
              { id: '22', chairPosition: 'below' },
              { id: '23', chairPosition: 'below' },
              { id: '24', chairPosition: 'below' },
              { id: '25', chairPosition: 'below' },
              { id: '26', chairPosition: 'below' },
              { id: 'empty' },
              { id: 'empty' },
              { id: 'empty' },],

              [
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },
                { id: 'empty' },],
      ];
    } else {
      seatLayout = [
        [
          { id: 'empty' },
          { id: '1', chairPosition: 'left' },
          { id: '2', chairPosition: 'right' },
          { id: 'empty' }],
        [
          { id: 'empty' },
          { id: '3', chairPosition: 'left' },
          { id: '4', chairPosition: 'right' },
          { id: 'empty' }],
        [
          { id: 'empty' },
          { id: '5', chairPosition: 'left' },
          { id: '6', chairPosition: 'right' },
          { id: 'empty' }],
        [
          { id: 'empty' },
          { id: '7', chairPosition: 'left' },
          { id: '8', chairPosition: 'right' },
          { id: 'empty' }]
      ];
    }

    return seatLayout.map((row, rowIndex) => (
      <div className="row" key={`row-${rowIndex}`} style={{ gap: '0.1rem' }}>
        {row.map((seat, seatIndex) => {
          if (seat.id === 'empty') {
            return <div className="seat-container empty" key={`empty-${rowIndex}-${seatIndex}`}></div>;
          }
  
          const seatStatus = seatInfo[seat.id];
          let seatClass = '';
          let iconClass = '';
  
          switch (seatStatus) {
            case 0: // empty
              seatClass = 'available';
              iconClass = 'available';
              break;
            case 1: // reserved
              seatClass = 'reserved';
              iconClass = 'reserved';
              break;
            case 2: // occupied
              seatClass = 'occupied';
              iconClass = 'occupied';
              break;
            default: // unknown
              seatClass = 'unknown';
              iconClass = 'unknown';
          }
  
          return (
            <div className={`seat-container ${seatClass} ${seat.chairPosition}`} key={`seat-${rowIndex}-${seatIndex}`}>
              <div className={`seat ${seatClass}`}>
                {seat.id.replace('seat', '')}
              </div>
              <SeatIcon className={`seat-icon ${iconClass}`} />
            </div>
          );
        })}
      </div>
    ));
  };

  // 좌석 상태에 따른 카운트 계산
  const available = Object.values(seatInfo).filter(
    (status) => status === 0
  ).length;
  const reserved = Object.values(seatInfo).filter(
    (status) => status === 1
  ).length;
  const occupied = Object.values(seatInfo).filter(
    (status) => status === 2
  ).length;

  return (
    <div className={`wrapper ${isTabletOrMobile ? 'mobile' : 'desktop'} ${isPortrait ? 'portrait' : 'landscape'}`}>
      <Header available={available} reserved={reserved} occupied={occupied} />
      <StatusIndicator />
      <section className="card">
        {renderSeatRows()}
      </section>
    </div>
  );
};

export default Lounge;