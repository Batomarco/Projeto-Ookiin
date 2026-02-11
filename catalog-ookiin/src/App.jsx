import { useEffect, useMemo, useState } from "react";

import Container from "./components/Container";
import TopNav from "./components/TopNav";
import SectionTitle from "./components/SectionTitle";
import Catalog from "./components/Catalog";
import SideMenu from "./components/SideMenu";
import EditImageModal from "./components/EditImageModal";
import EditListModal from "./components/EditListModal";
import ConfirmClearModal from "./components/ConfirmClearModal";

import "./styles/app.sass"

const DEFAULT_SORT = "dateAsc";

function App() {

  const [urlsObjetos, setUrlsObjetos] = useState(() => {
      const raw = localStorage.getItem("urlsObjetos");
      return raw ? JSON.parse(raw) : [];
  });

  //Salva sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem("urlsObjetos", JSON.stringify(urlsObjetos));
  }, [urlsObjetos]);

  const [menuObj, setMenuObj] = useState(null);
  const [pendingObj, setPendingObj] = useState(null);

  const isMenuOpen = !!menuObj;

  function toggleMenuLateral(objectList) {
    setMenuObj((prev) => {
      if (prev && prev.id === objectList.id) {
        setPendingObj(null)
        return null;
      }

      if (prev && prev.id !== objectList.id) {
        setPendingObj(objectList)
        return null;
      }

      return objectList;
    });
  }

  function closeMenuLateral() {
    setPendingObj(null);
    setMenuObj(null);
  }

  function handleMenuClosed() {
    if (pendingObj) {
      setMenuObj(pendingObj);
      setPendingObj(null)
    }
  }

  useEffect(() => {
    const main = document.getElementById("body");
    if (!main) return

    if (menuObj) {
      main.style.marginRight = "250px";
    } else {
      main.style.marginRight = "0";
    }
  }, [menuObj]);

  function adicionarObjeto(urlObject) {
    const objectList = {
      id: crypto.randomUUID(),
      url: urlObject,
      nome: "",
      colocacao: urlsObjetos.length + 1,
      rating: 0,
      checkboxCount: 1,
      checkboxState: [true],
      notes: "",
    };

      setUrlsObjetos((prev) => [...prev, objectList]);
  }

  function updateNome(id, novoNome) {
    setUrlsObjetos((prev) =>
      prev.map((o) => (o.id === id ? { ...o, nome: novoNome } : o))
    );
  }

  function editarNome(id) {
    setUrlsObjetos((prev) =>
      prev.map((o) => (o.id === id ? { ...o, nome: "" } : o))
    );

    setMenuObj((prev) => (prev && prev.id === id ? { ...prev, nome: "" } : prev));

    setMenuObj(null)
  }

  function updateRating(id, rating) {
    setUrlsObjetos((prev) =>
      prev.map((o) => (o.id === id ? { ...o, rating } : o))
    );

    setMenuObj((prev) => (prev && prev.id === id ? { ...prev, rating } : prev));
  }

  const [isEditImagemOpen, setIsEditImageOpen] = useState(false);
  const [editImageId, setEditImageId] = useState(null);

  function openEditImageModal() {
    if (!menuObj) return;
    setEditImageId(menuObj.id);
    setIsEditImageOpen(true);
  }

  function closeEditImageModal() {
    setIsEditImageOpen(false);
    setEditImageId(null);
  }

  function salvarNovaURL(id, novaURL) {
    setUrlsObjetos((prev) => 
      prev.map((o) => (o.id === id ? { ...o, url: novaURL } : o))
    );

    setMenuObj((prev) => (prev && prev.id === id ? { ...prev, url: novaURL } : prev));

    closeEditImageModal();
  }

  function removerObjeto(id) {
    if (!window.confirm("Tem certeza que deseja remover este item?")) return;
    
    setMenuObj(null);
    setUrlsObjetos((prev) => {
      const next = prev.filter((o) => o.id !== id);
      return normalizeColocacao(next);
    });
  }

  const [sortingOption, setSortingOption] = useState(() => {
    return localStorage.getItem("sortingOption") || DEFAULT_SORT;
  })

  useEffect(() => {
    localStorage.setItem("sortingOption", sortingOption);
  }, [sortingOption]);

  function normalizeColocacao(list) {
    return list.map((o, i) => ({ ...o, colocacao: i + 1}));
  }

  const urlsObjetosOrdenada = useMemo(() => {
    const arr = [...urlsObjetos];

    switch (sortingOption) {
      case "nameAsc":
        return arr.sort((a, b) => (a.nome || "").toLowerCase().localeCompare((b.nome || "").toLowerCase()));
      case "nameDesc":
        return arr.sort((a, b) => (b.nome || "").toLowerCase().localeCompare((a.nome || "").toLowerCase()));
      case "starsAsc":
        return arr.sort((a, b) => (a.rating || 0) - (b.rating || 0));
      case "starsDesc":
        return arr.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "dateDesc":
        return arr.sort((a, b) => (b.colocacao || 0) - (a.colocacao || 0));
      case "dateAsc":
      default:
        return arr.sort((a, b) => (a.colocacao || 0) - (b.colocacao || 0));
    }
  }, [urlsObjetos, sortingOption])

  const DEFAULT_VIEW = localStorage.getItem("viewMode") || "standard";
  const [viewMode, setViewMode] = useState(DEFAULT_VIEW);

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  const [searchTerm, setSearchTerm] = useState("");

  const urlsObjetosFiltrada = useMemo(() => {
    if (!searchTerm.trim()) return urlsObjetosOrdenada;

    const termo = searchTerm.toLowerCase();

    return urlsObjetosOrdenada.filter((objectList) => {
      const nome = (objectList.nome || "").toLowerCase();
      const colocacao = String(objectList.colocacao || "");
      return nome.includes(termo) || colocacao.includes(termo);
    });
  }, [urlsObjetosOrdenada, searchTerm]);

  function updateTemporadaCheck(id, index, checked) {
    setUrlsObjetos((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;

        const next = [...(o.checkboxState || [])];
        next[index] = checked;

        return { ...o, checkboxState: next };
      })
    );

    setMenuObj((prev) => {
      if (!prev || prev.id !== id) return prev;
      const next = [...(prev.checkboxState || [])];
      next[index] = checked;
      return { ...prev, checkboxState: next };
    });
  }

  function addTemporada(id) {
    setUrlsObjetos((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;

        const count = (o.checkboxCount || 0) + 1;
        const state = [...(o.checkboxState || [])];

        //nova temporada começa desmarcada
        state.push(false);

        return { ...o, checkboxCount: count, checkboxState: state };
      })
    );

    setMenuObj((prev) => {
      if (!prev || prev.id !== id) return prev;
      const count = (prev.checkboxCount || 0) + 1;
      const state = [...(prev.checkboxState || [])];
      state.push(false);
      return { ...prev, checkboxCount: count, checkboxState: state };
    });
  }

  function removeTemporada(id) {
    setUrlsObjetos((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;

        const count = o.checkboxCount || 0;
        if (count <= 1) return o; //não deixa remover abaixo de 1

        const state = [...(o.checkboxState || [])];
        state.pop();

        return { ...o, checkboxCount: count - 1, checkboxState: state };
      })
    );

    setMenuObj((prev) => {
      if (!prev || prev.id !== id) return prev;
      const count = prev.checkboxCount || 0;
      if (count <= 1) return prev;

      const state = [...(prev.checkboxState || [])];
      state.pop();

      return { ...prev, checkboxCount: count - 1, checkboxState: state };
    });
  }

  function updateNotes(id, value) {
    setUrlsObjetos((prev) =>
      prev.map((o) => (o.id === id ? { ...o, notes: value} : o))
    );

    setMenuObj((prev) =>
      prev && prev.id === id ? { ...prev, notes: value} : prev
    );
  }

  const [borderColor, setBorderColor] = useState(() => {
    return localStorage.getItem("borderColor") || "#87cefa";
  })

  useEffect(() => {
    localStorage.setItem("borderColor", borderColor);
  }, [borderColor])

  const [isEditListOpen, setIsEditListOpen] = useState(false);

  function openEditList() {
    setIsEditListOpen(true);
  }
  function closeEditList() {
    setIsEditListOpen(false);
  }

  function saveNewOrder(newList) {
    setUrlsObjetos(normalizeColocacao(newList));
    closeEditList();
  }

  function removerTudoConfirmado() {
    //fecha coisas que possam estar abertas
    setMenuObj(null);
    setIsEditListOpen(false);
    setSearchTerm("");

    setUrlsObjetos([]);
    localStorage.removeItem("urlsObjetos");
  }

  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);

  function openConfirmClear() {
    setIsConfirmClearOpen(true);
  }
  function closeConfirmClear() {
    setIsConfirmClearOpen(false);
  }
  function confirmClearAll(){
    removerTudoConfirmado();
    closeConfirmClear();
  }

  return (
    <>
      <div className={`app-shell ${isMenuOpen ? "menu-open" : ""}`}>
        <EditListModal 
          isOpen={isEditListOpen}
          onClose={closeEditList}
          urlsObjetos={urlsObjetos}
          onSave={saveNewOrder}
        />
        <ConfirmClearModal 
          isOpen={isConfirmClearOpen}
          onConfirm={confirmClearAll}
          onCancel={closeConfirmClear}
        />
        <TopNav 
          borderColor={borderColor}
          onChangeBorderColor={setBorderColor}
          onOpenEditList={openEditList}
          hasItems={urlsObjetos.length > 0}
          onOpenConfirmClear={openConfirmClear}
        />
        <Container onAdicionarObjeto={adicionarObjeto}/>
        {urlsObjetos.length > 0 && (
          <SectionTitle 
            sortingOption={sortingOption} 
            onChangeSorting={setSortingOption}
            viewMode={viewMode}
            onChangeView={setViewMode}
            searchTerm={searchTerm}
            onChangeSearch={setSearchTerm}
            borderColor={borderColor}
            onChangeBorderColor={setBorderColor}
          />
        )}
        <Catalog 
          urlsObjetos={urlsObjetosFiltrada}
          viewMode={viewMode}
          toggleMenuLateral={toggleMenuLateral}
          onUpdate={updateNome}
          onRate={updateRating}
          borderColor={borderColor}
        />
      </div>

      <SideMenu
        isOpen={isMenuOpen}
        objectList={menuObj}
        onClose={closeMenuLateral}
        onClosed={handleMenuClosed}
        onEditImage={openEditImageModal}
        onEditNome={() => menuObj && editarNome(menuObj.id)}
        onDelete={() => menuObj && removerObjeto(menuObj.id)}
        onToggleSeason={(index, checked) => menuObj && updateTemporadaCheck(menuObj.id, index, checked)}
        onAddSeason={() => menuObj && addTemporada(menuObj.id)}
        onRemoveSeason={() => menuObj && removeTemporada(menuObj.id)}
        onUpdateNotes={(value) => menuObj && updateNotes(menuObj.id, value)}
      />

      <EditImageModal
        isOpen={isEditImagemOpen}
        onClose={closeEditImageModal}
        onSave={(novaURL) => salvarNovaURL(editImageId, novaURL)}
      />
    </>
  );

}

export default App
