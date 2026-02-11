import { useEffect, useRef, useState } from 'react';

import '../styles/sectionTitle.sass'

const SectionTitle = ({ sortingOption, onChangeSorting, viewMode, onChangeView, searchTerm, onChangeSearch }) => {

    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);

    const sortMenuRef = useRef(null);
    const sortIconRef = useRef(null);

    const viewMenuRef = useRef(null);
    const viewIconRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (
                sortMenuRef.current &&
                !sortMenuRef.current.contains(e.target) &&
                sortIconRef.current &&
                !sortIconRef.current.contains(e.target)
            ) setIsSortOpen(false)

            if (
                viewMenuRef.current &&
                !viewMenuRef.current.contains(e.target) &&
                viewIconRef.current &&
                !viewIconRef.current.contains(e.target)
            ) setIsViewOpen(false);
        }

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <>
            <div className='section-title'>
                <div className='left-controls'>
                    <h2>Ordenação
                        <i 
                            ref={sortIconRef} className='fas fa-sort' id='sort-icon'
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsSortOpen((prev) => !prev);
                            }}
                        />
                    </h2>
                    
                    <div 
                        ref={sortMenuRef} className='sort-menu' id='sort-menu'
                        style={{ display: isSortOpen ? "block" : "none"}}
                    >
                        <div className='sort-option'>
                            <input type='radio' id='dateAsc' name='sort-option' value="dateAsc" 
                                checked={sortingOption === "dateAsc"} 
                                onChange={(e) => {
                                    onChangeSorting(e.target.value)
                                    setIsSortOpen(false);
                                }}
                            />
                                <label htmlFor='dateAsc'> Data de Criação (Ascendente)</label>
                        </div>
                        <div className='sort-option'>
                            <input type='radio' id='dateDesc' name='sort-option' value="dateDesc"
                                checked={sortingOption === "dateDesc"}
                                onChange={(e) => {
                                    onChangeSorting(e.target.value)
                                    setIsSortOpen(false);
                                }}
                            />
                                <label htmlFor='dateDesc'> Data de Criação (Descendente)</label>
                        </div>
                        <div className='sort-option'>
                            <input type='radio' id='starsAsc' name='sort-option' value="starsAsc"
                                checked={sortingOption === "starsAsc"}
                                onChange={(e) => {
                                    onChangeSorting(e.target.value)
                                    setIsSortOpen(false);
                                }}
                            />
                                <label htmlFor='starsAsc'> Número de Estrelas (1-5)</label>
                        </div>
                        <div className='sort-option'>
                            <input type='radio' id='starsDesc' name='sort-option' value="starsDesc"
                                checked={sortingOption === "starsDesc"}
                                onChange={(e) => {
                                    onChangeSorting(e.target.value)
                                    setIsSortOpen(false);
                                }}
                            />
                                <label htmlFor='starsDesc'> Número de Estrelas (5-1)</label>
                        </div>
                        <div className='sort-option'>
                            <input type='radio' id='nameAsc' name='sort-option' value="nameAsc"
                                checked={sortingOption === "nameAsc"}
                                onChange={(e) => {
                                    onChangeSorting(e.target.value)
                                    setIsSortOpen(false);
                                }}
                            />
                                <label htmlFor='nameAsc'> Nome (A-Z)</label>
                        </div>
                        <div className='sort-option'>
                            <input type='radio' id='nameDesc' name='sort-option' value="nameDesc"
                                checked={sortingOption === "nameDesc"}
                                onChange={(e) => {
                                    onChangeSorting(e.target.value)
                                    setIsSortOpen(false);
                                }}
                            />
                                <label htmlFor='nameDesc'> Nome (Z-A)</label>
                        </div>
                    </div>

                    <h2>Visualização{" "} 
                        <i 
                            ref={viewIconRef} className='fas fa-th-large' id='view-icon'
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsViewOpen((prev) => !prev);
                            }}
                        />
                    </h2>

                    <div 
                        ref={viewMenuRef} className='view-menu' id='view-menu'
                        style={{ display: isViewOpen ? "block" : "none" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div>
                            <input 
                                type='radio' id='standard' name='view-option' value="standard" 
                                checked={viewMode === "standard"} onChange={(e) => {
                                    onChangeView(e.target.value);
                                    setIsViewOpen(false);
                                }}
                            />
                                <label htmlFor='standard'> Imagens Padrão</label>

                        </div>
                        <div>
                            <input 
                                type='radio' id='big' name='view-option' value="big"
                                checked={viewMode === "big"} onChange={(e) => {
                                    onChangeView(e.target.value);
                                    setIsViewOpen(false);
                                }}
                            />
                                <label htmlFor='big'> Imagens Grandes</label>
                        </div>
                        <div>
                            <input 
                                type='radio' id='small' name='view-option' value="small"
                                checked={viewMode === "small"} onChange={(e) => {
                                    onChangeView(e.target.value);
                                    setIsViewOpen(false);
                                }}
                            />
                                <label htmlFor='small'> Imagens Pequenas</label>
                        </div>
                   </div>
                </div>

                <div className='section-line'></div>
                <div className='section-busca'>
                    <label className='section-busca' htmlFor='busca'><i className='fas fa-search'></i></label>
                    <input 
                        type='text' id='busca' placeholder='Procurar pelo nome'
                        value={searchTerm} onChange={(e) => onChangeSearch(e.target.value)}
                    />
                </div>
            </div>

        </>
    );
}

export default SectionTitle