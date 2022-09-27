import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonItem, IonTitle } from "@ionic/react";
import React from "react";

class Favorite extends React.Component{

    state = {
        favorites:[]
    };

    getFavorite(){
        this.setState({}, ()=>{
            fetch("http://localhost:3000/favorites").then(response=>response.json()).then(result => {this.setState({favorites: result})});
        })
    }

    cancelFavorite(id: any,index: number){
        
        const {favorites} = this.state;
                
        favorites.splice(index,1);
        const listFav = [...favorites];

        this.setState({favorites: listFav})

        fetch("http://localhost:3000/favorites/"+ id,{method: 'DELETE'})
        .then(res => res.json());
    }

    componentDidMount() {
        this.getFavorite();
    }

    render(){
        const {favorites} = this.state;
        return(
            <IonContent>
                        <IonItem>
                            <IonTitle>FAVORITE</IonTitle>
                        </IonItem>
            
            {favorites.map((favorite,index)=>{
                const {
                    id,
                    namePlate,
                    city,
                    country
                } = favorite;
                return(
                        <IonCard key={ id }>
                            <IonCardHeader>
                                <IonCardTitle>{ namePlate }</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <div>{ city }</div>
                                <div>{ country }</div>
                            </IonCardContent>
                            <IonButton onClick={()=>this.cancelFavorite(id,index)}>Retirer des favoris</IonButton>
                        </IonCard>   
                );
            })
        }
        </IonContent>
            
        );
    }

}

export default Favorite;