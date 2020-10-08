import React from 'react';

export const Date = ({datelist}) => {
   const dateList = datelist.map(element =>
        <div key={element.id}>
            <input type="radio" name="date" value={element.date} />{element.date}
        </div>
        )
    console.log(dateList)

    return(
        <div>
        {dateList}
        </div>
    )
}