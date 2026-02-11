import '../styles/container.sass'

import Escolha from './Escolha';

const Container = ({ onAdicionarObjeto }) => {
    return (
        <>
        <div className='container'>
            <div className='title-container'>
                <h2 className='page-subtitle'>
                    Crie sua lista personalizada!
                </h2>
            </div>

            <div>
                <Escolha onAdicionarObjeto={onAdicionarObjeto}/>
            </div>
        </div>
        </>
    );
}

export default Container