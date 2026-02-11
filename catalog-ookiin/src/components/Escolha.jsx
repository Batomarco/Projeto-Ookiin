import '../styles/escolha.sass'
import SearchBox from './SearchBox';

import { useState } from 'react';

const Escolha = ({ onAdicionarObjeto }) => {
    
    const [active, setActive] = useState(null);

    function toggleUrl() {
        setActive((prev) => (prev === "url" ? null : "url"));
    }

    function togglePesquisar() {
        setActive((prev) => (prev === "search" ? null : "search"));
    }

    const [url, setUrl] = useState("");
    const [formato, setFormato] = useState("");

    function urlValidaComFormato() {
        if (!url || !formato) return false;

        try {
            new URL(url);
        } catch {
            return false;
        }

        return url.toLowerCase().endsWith("." + formato);
    }

    function handleAdicionar() {
        if (!urlValidaComFormato()) {
            alert("Endereço de imagem diferente do indicado");
            return
        }

        onAdicionarObjeto(url.trim());
        setUrl("");
        setFormato("");
    }

    //Texto digitado
    const [searchTerm, setSearchTerm] = useState("");
    //Feedback enquanto busca
    const [loading, setLoading] = useState(false);

    function searchImages() {
        const term = searchTerm.trim();
        if (!term) return;

        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        const cx = import.meta.env.VITE_GOOGLE_CX;
        
        const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${searchTerm}&key=${apiKey}&cx=${cx}&searchType=image`;

        setLoading(true);

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.items && data.items.length > 0) {
                    const imageUrl = data.items[0].link;

                    onAdicionarObjeto(imageUrl)

                    setSearchTerm("");
                } else {
                    alert("Nenhuma imagem encontrada para a pesquisa.")
                }
            })

        .finally(() => {
            setLoading(false);
        })
    }

    return (
        <div className="container">
            <div>
                <h3 id='escolha'>Escolha como inserir a imagem:</h3>
                <button id='btnInserirUrl' onClick={toggleUrl}>Inserir URL</button>

                <button id='btnPesquisarImagem' onClick={togglePesquisar}>Pesquisar Imagens</button>
            </div>

            {active === "url" && (
                <div className='form-container' id='divForm'>
                    <div className='form-wrapper'>
                        <input 
                            type='text' 
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder='Insira o endereço da imagem'
                        />
                        <div id='select-container'>
                            <select 
                                id='formato' 
                                onChange={(e) => setFormato(e.target.value)} 
                                value={formato}
                            >
                                <option value={""}>Formato</option>
                                <option value={"jpg"}>.jpg</option>
                                <option value={"png"}>.png</option>
                                <option value={"jpeg"}>.jpeg</option>
                                <option value={"jpe"}>.jpe</option>
                            </select>
                        </div>
                    </div>

                    {url && formato && !urlValidaComFormato() && (
                        <small style={{color: "red"}}>
                            A URL não corresponde ao formato selecionado.
                        </small>
                    )}

                    <button id='btnAdicionarObjeto' onClick={handleAdicionar} disabled={!urlValidaComFormato()}>Adicionar Imagem</button>
                </div>  
            )}

            {active === "search" && (
                <div className='form-container'>
                    <SearchBox />
                    <div id='search-box'>
                        <form className='gcse-searchbox' onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type='text' 
                                placeholder='Digite sua pesquisa' 
                                autoComplete='off' 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        if (loading) return;
                                        e.preventDefault();
                                        searchImages();
                                    }
                                }}
                            />
                        
                        </form>
                        <button type='button' onClick={searchImages} disabled={loading}>
                                {loading ? "Pesquisando..." : "Pesquisar"}
                        </button>
                        
                    </div>
                </div>
            )}

            <div id='result-container' style={{display: "none"}} >
                <img id='search-result' alt='Imagem Pesquisada'></img>
            </div>
        </div>
    );
}

export default Escolha