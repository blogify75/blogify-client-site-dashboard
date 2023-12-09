import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const Pagination = ({ data, container, pageNumber, perPageNo = 10, isBorder = false, border = 'green', background = false }) => {

    const defaultPageNo = perPageNo;

    const [number, setNumber] = useState(defaultPageNo);
    const [buttonNumber, setButtonNumber] = useState(defaultPageNo);
    const [modifiedButtonNumber, setModifiedButtonNumber] = useState()

    // eslint-disable-next-line react/prop-types
    const roundedDataLength = Math.ceil(data?.length / defaultPageNo);
    const totalDataLength = roundedDataLength * defaultPageNo
    // console.log(totalDataLength)

    const arrayOfObjects = [];
    for (let id = 1; id <= (totalDataLength / defaultPageNo); id++) {
        const newObj = { id: id };
        arrayOfObjects.push(newObj);
    }

    let mappedArray = arrayOfObjects.map((obj) => {
        return {
            ...obj,
        };
    });

    // console.log(mappedArray.length);

    const handlePage = (value) => {
        const pageNumber = value * defaultPageNo;
        setNumber(pageNumber)
    }



    useEffect(() => {
        const makeLastDigitZero = (number) => {
            if (number % defaultPageNo !== 0) {
                number = Math.ceil(number / defaultPageNo) * defaultPageNo;
            }
            setModifiedButtonNumber(number)
        }
        makeLastDigitZero(mappedArray?.length)
        if (modifiedButtonNumber < buttonNumber) {
            setButtonNumber(defaultPageNo)

        }
    }, [buttonNumber, mappedArray, modifiedButtonNumber, defaultPageNo]);



    const handlePageButton = (value) => {
        if (value === 'decrease' && buttonNumber > defaultPageNo) {
            setButtonNumber(buttonNumber - defaultPageNo)
        } else if (value === 'increase') {
            setButtonNumber(buttonNumber + defaultPageNo)
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        const paginatedData = data?.slice((number - defaultPageNo), number);
        container(paginatedData)
        pageNumber(number / defaultPageNo)
    }, [container, pageNumber, number, defaultPageNo, data])


    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {
                mappedArray?.length > 0 &&
                <div onClick={() => handlePageButton('decrease')}> <p style={{ fontSize: '15px', marginRight: '25px', cursor:'pointer' }}><i className="uil uil-angle-left-b"></i></p> </div>
            }
            {
                mappedArray?.slice((buttonNumber - defaultPageNo), buttonNumber).map(m => {
                    return (
                        <div
                            key={m.id}
                            onClick={() => handlePage(m.id)}

                            style={{
                                height: '25px',
                                width: '25px',
                                border: `${isBorder ? `1px solid ${m.id === (number / defaultPageNo) ? `${border}` : 'red'}` : ''}`,
                                borderRadius: '5px',
                                margin: '5px', display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                backgroundColor: `${background ? `${m.id === (number / defaultPageNo) ? 'lightGray' : ''}` : ''}`
                            }}
                        >
                            <p >{m.id}</p>
                        </div>
                    )
                })
            }
            {
                mappedArray?.length > 0 &&
                <div onClick={() => handlePageButton('increase')}> <p style={{ fontSize: '15px', marginLeft: '15px', cursor:'pointer' }}><i className="uil uil-angle-right-b"></i></p> </div>
            }
        </div>
    );
};

export default Pagination;