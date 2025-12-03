import { useNavigate } from 'react-router-dom';
import { l } from '../language';
import './RoomList.css'
import { useEffect, useState } from 'react';
import { getAllRoom } from '../Api';

function RoomList( {setClose} ) {

    const navigate = useNavigate();

    const roomDivMaker = (roomId, roomCount) => {
        return (
            <div className='Room'>
                <div className='roomBox' style={{width:"500px"}}>
                    <div className='roomHeader'>
                        <p>{l("room_list_room_code")}</p>
                    </div>
                    <div className='roomMain'>
                        <h1>{roomId}</h1>
                    </div>
                </div>
                <div className='roomBox'>
                    <div className='roomHeader'>
                        <p>{l("room_list_room_count")}</p>
                    </div>
                    <div className='roomMain' style={{flexDirection:"row"}}>
                        <img src='/Image/user.png' alt="people"></img>
                        <h1 style={{lineHeight:"60px", width:"auto"}} >{roomCount}</h1> 
                    </div>
                </div>
                <div className='roomBox' style={{flex:" 1 0 auto"}}> 
                    <div className='roomHeader'>
                        <p>{l("room_list_room_join")}</p>
                    </div>
                    <div className='roomMain'>
                        <button onClick={() => navigate(`/room/${roomId}`)}>{l("room_list_room_join_button")}</button>
                    </div>
                </div>
            </div>
        )
    }

    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        (async () => {
            const { success, roomList } = await getAllRoom();
            if (success) {
                setRoomList(roomList);
            }
        })();
    },[])

    return (
        <>
            <div className="RoomList">
                <div className='RoomBox' style={{backgroundImage: "url('background.jpg') "}}>
                    <h1>{l("room_list")}</h1>
                    {roomList.map((room) => {
                        return roomDivMaker(room.roomId, room.roomCount)
                    })}
                    {roomList.length === 0 && (
                        <h1>{l("room_list_empty")}</h1>
                    )}
                    <div className='close' onClick={() => setClose(false)}>X</div>
                </div>
                
            </div>
        </>
    )
}
export default RoomList;