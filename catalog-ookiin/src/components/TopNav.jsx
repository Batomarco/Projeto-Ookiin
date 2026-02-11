import { useState } from 'react';

import '../styles/topNav.sass'

import ConfigModal from "./ConfigModal";
import InfoModal from './InfoModal';

const TopNav = ( {borderColor, onChangeBorderColor, onOpenEditList, hasItems, onOpenConfirmClear } ) => {
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    const [isInfoOpen, setIsInfoOpen] = useState(false)

    return (
        <div className='top-nav'>
            <h1 className='title-logo'>Projeto Ookiin</h1>

            <div id='buttons'>
                <button
                    id='info-button'
                    type='button'
                    onClick={() => setIsInfoOpen(true)}
                >
                    <i className='fas fa-info-circle'></i>
                </button>

                <button 
                    id='config-button' type='button'
                    onClick={() => setIsConfigOpen(true)}
                >
                    <i className='fas fa-cog'></i>
                </button>
            </div>

            <InfoModal
                isOpen={isInfoOpen}
                onClose={() => setIsInfoOpen(false)}
            />
            <ConfigModal
                isOpen={isConfigOpen}
                onClose={() => setIsConfigOpen(false)}
                borderColor={borderColor}
                onChangeBorderColor={onChangeBorderColor}
                onOpenEditList={onOpenEditList}
                hasItems={hasItems}
                onOpenConfirmClear={onOpenConfirmClear}
            />
        </div>
    );
}

export default TopNav