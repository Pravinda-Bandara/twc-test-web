import React from 'react';

type LogoProps = {
    textColor: string;
    imageSize: string;
    textSize: string;
};

const Logo: React.FC<LogoProps> = ({ textColor, imageSize, textSize }) => {
    return (
        <>
            <div>
                <div className="flex justify-start items-center">
                    <img src="src/assets/Logo.png" alt="" className={`mr-2 ${imageSize}`}/>
                    <span className={`${textColor} ${textSize}  `}>twc</span>
                </div>

                <div>
                    <p className={`${textColor} font-extrabold ${textSize}`}>contacts</p>
                    <p className={`${textColor} ${textSize}`}>portal</p>
                </div>
            </div>
        </>
    );
};

export default Logo;
