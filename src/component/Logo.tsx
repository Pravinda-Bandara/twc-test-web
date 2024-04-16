import React from 'react';

type LogoProps = {
    textColor: string;
};

const Logo: React.FC<LogoProps> = ({ textColor }) => {
    return (
        <>
            <div>
                <div className="flex justify-start items-center">
                    <img src="src/assets/Logo.png" alt="" className="mr-2 w-10"/>
                    <span className={`${textColor} text-3xl font-bold`}>twc</span>
                </div>

                <div>
                    <p className={`${textColor} font-extrabold text-3xl`}>contacts</p>
                    <p className={`${textColor} text-3xl`}>portal</p>
                </div>
            </div>

        </>

    );
};

export default Logo;
