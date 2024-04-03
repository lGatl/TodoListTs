import React, { useState } from 'react';
import {Todo,TodoType} from './Todo'
import SetTodo from './SetTodo'

const prefix = '' // todo 1.2 prefix = 'Todo: '

const TodoList : React.FC = ()=>{
    // reactive state input
    const [inputTitre, setTitre] = useState<string>(prefix)
    // todo Pour la persistance des données on peut utiliser des hooks de cycle de vie pour initialiser le store avec une base de donnée au chargement du composant...
    // reactive state global store
    const [store, setStore] = useState<TodoType[]>([])
    /**
     * Input "titre" control
     */
    const changeTitre = (value:string)=>{
        if (value.startsWith(prefix) ){
            setTitre(value)
        }

    }
    // todo Pour la persistance des données on peut mettre a jour l'élément qui a l'identifiant id lorsqu'une tache est terminee
    /**
     * Checkboxes estTreminee control
     */
    const changeEstTerminee= (id:string,value:boolean)=>{
        // on converti le store en objet {[id]: todo, ....}
        // On évite ainsi l'utilisation de find qui présente de faibles performances
        // Reduce renvoie une copie superficielle du store s'assurant ainsi de son immutabilité
       const storeObject= store.reduce((total:{ [id: string]: TodoType },todo)=>{
           total[todo.id as keyof typeof total]=todo
           return  total
       },{})
        storeObject[id].estTerminee=value
       setStore(Object.values(storeObject))
    }
    const addToStore = ()=>{
        if(inputTitre.length>prefix.length){
            // J'utilise Date.now() pour génerer un id.
            // Si on utilisait une BDD, un ajout en base serait ordonné ici
            // L'id générée par la BDD serait alors récupérée et mettrait la nouvelle todo à jour avant d'etre poussée dans le state
            // Attention les mises en base sont asynchrone
            const id = Date.now()+''
            setStore([...store, {id, titre: inputTitre, estTerminee: false}])
            setTitre(prefix)
        }
    }
    return (
        <form>
            {/* On affiche les todos enregistrées dans le store */}
            {
                store.map((todo)=> {
                return <Todo id={todo.id} key={todo.id} titre={todo.titre} estTerminee={todo.estTerminee}
                      changeEstTerminee={changeEstTerminee}/>
            })
            }
            {/* On affiche le formulaire de saisie des nouvelles totos */}
            <SetTodo titre={inputTitre} changeTitre={changeTitre} />
            <button onClick={addToStore} type="button">Add</button>
        </form>
    );
}

export default TodoList
