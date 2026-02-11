import '../styles/catalog.sass'

import CatalogItem from './CatalogItem'

const Catalog = ({ urlsObjetos, viewMode, toggleMenuLateral, onUpdate, onRate }) => {

    const borderColor = localStorage.getItem("borderColor") || "#87cefa"

    return (
        <>
            <div id='catalog-object' style={{display: ''}} className={viewMode}>
                {urlsObjetos.length === 0 ? (
                    <div className='empty-state'>
                        <p>Nenhum item Encontrado</p>
                    </div>
                ) : (                
                    urlsObjetos.map((obj, idx) => (
                        <CatalogItem
                            key={obj.id}
                            objectList={obj}
                            index={idx}
                            onOpenMenu={toggleMenuLateral}
                            onUpdate={onUpdate}
                            onRate={onRate}
                            borderColor={borderColor}
                        />
                    ))
                )}
            </div>
        </>
    )
}

export default Catalog