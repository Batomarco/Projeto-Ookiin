import { useEffect, useRef } from "react";
import "../styles/infoModal.sass";

const InfoModal = ({ isOpen, onClose, children }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e) {
      if (e.key === "Escape") onClose?.();
    }

    document.addEventListener("keydown", onKeyDown);
    // trava scroll do fundo
    document.body.classList.add("modal-open");

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="info-modal-overlay"
      onClick={(e) => {
        if (panelRef.current && !panelRef.current.contains(e.target)) {
          onClose?.();
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="info-modal" ref={panelRef}>
        <button
          className="info-close"
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          title="Fechar"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="info-header">
          <div className="info-badge">
            <i className="fas fa-info-circle"></i>
          </div>
          <div>
            <h1>Sobre o Projeto</h1>
            <p className="info-subtitle">Projeto Ookiin — versão Beta</p>
          </div>
        </div>

        <div className="info-content">
          {children}
                Olá! Seja bem-vindo(a)! 👋 
            <br />
                Você pode me chamar de Ookiin.
                Sou criador de conteúdo no YouTube e estou desenvolvendo este site do zero, documentando todo o processo no meu canal. Se tiver curiosidade, fica o convite para conferir 
            <br />
            <br />
                🧩 O que é este site?
            <br />
                Este site é um catálogo personalizável, criado para você organizar praticamente qualquer coisa, como:

                filmes, séries, animes, novelas, jogos, receitas, pessoas, personagens, listas pessoais…
            <br />
                O limite é a sua imaginação.
            <br />
            <br />
                🖼️ Como começar?
            <br />
                Para adicionar um item ao catálogo, você precisa inserir uma imagem.
                Existem duas formas:
            <br />
                Inserir URL: use o link direto de uma imagem (com a terminação correta, como .jpg, .png, etc.)
            <br />
                Pesquisar imagem: digite sua pesquisa e o site busca automaticamente a primeira imagem do Google
                (os resultados podem variar, então usar palavras-chave ajuda bastante)
            <br />
                Depois disso, o item aparecerá no catálogo.
            <br />
            <br />
                ⭐ O que dá pra fazer com os itens?
            <br />
                No catálogo, você pode:
            <br />
                mudar a ordem da lista (data, nome ou estrelas)
            <br />
                classificar com estrelas
            <br />
                alterar o tamanho da visualização
            <br />
                pesquisar itens pelo nome
            <br />
            <br />
                Ao clicar em uma imagem, abre um menu lateral, onde você pode:
            <br />
                editar o nome
            <br />
                editar a imagem
            <br />
                remover o item
            <br />
                marcar temporadas assistidas (ideal para séries, animes e novelas)
            <br />
                usar um post-it de anotações
            <br />
            <br />
                💭 Anote o que quiser:
            <br />
                O que achou da obra?
                Quando lança nova temporada?
                Quer continuar assistindo?
            <br />
                Itens com 5 estrelas recebem uma borda especial dourada
            <br />
            <br />
                ⚙️ Configurações
            <br />
                Nas configurações, você pode:
            <br />
                mudar a cor da borda das imagens do catálogo
            <br />
                editar manualmente a ordem dos itens
            <br />
                remover todos os itens (útil em casos de bugs ou se quiser recomeçar)
            <br />
            <br />
                🚧 Aviso importante – Versão Beta
            <br />
                Este projeto ainda está em versão beta e não está finalizado.
                Novas funções serão adicionadas e algumas mudanças podem fazer listas antigas serem perdidas.
            <br />
            <br />
                👉 Use esta versão principalmente para testar, explorar e encontrar bugs.
            <br />
                Se encontrar algum problema, ou quiser sugerir melhorias, envie um e-mail para:
            <br />
                📧 contato.ookiin@gmail.com
            <br />
                Críticas, elogios e ideias são muito bem-vindos!
            <br />
            <br />
                💙 Apoie o projeto
            <br />
                Se você quiser apoiar este projeto financeiramente, existe um link do LivePix disponível.
            <br />
                <a  target="_blank" href="https://livepix.gg/ookiinz">https://livepix.gg/ookiinz</a>
            <br />            
                Qualquer valor já ajuda demais 🙏
            <br />
                Muito obrigado pela sua visita!
                Espero ver você novamente nas próximas versões 
        </div>

        <div className="info-footer">
          <button className="info-btn" type="button" onClick={onClose}>
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
}


export default InfoModal