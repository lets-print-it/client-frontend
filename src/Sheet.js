import React from 'react';

function Sheet(props) {
    return (
        <div className="flex justify-center h-screen w-screen bg-blue-100">
            <div className="max-w-lg pt-7">
                <div className="p-5 bg-white rounded-lg">
                {props.children}
                </div>
            </div>
        </div>
    );
}

export default Sheet;