const action = (min1 = '', now = '', logic = []) => {
    //logic
    const A=logic[0],B=logic[1],C=logic[2],D=logic[3],E=logic[4],F=logic[5], G=logic[6]
    
    // Sama
    if(min1 === now){return 'Neutral'}

    // Ujung
    if(min1 === 'Strong Sell'   && now === 'Sell'       ){
        if(A===1 && F ===0 && G ===0){return 'Buy'}
        else if (A===1 && F ===1 && G ===0){return 'Sell'}
        else if(A===1 && F ===0 && G ===1){return 'Sell'}
        else if (A===1 && F ===1 && G ===1){return 'Buy'}
        else{return 'Neutral'}
    }
    if(min1 === 'Strong Buy'    && now === 'Buy'        ){
        if(A===1 && F ===0 && G ===0){return 'Sell'}
        else if (A===1 && F ===1 && G ===0){return 'Buy'}
        else if(A===1 && F ===0 && G ===1){return 'Buy'}
        else if (A===1 && F ===1 && G ===1){return 'Sell'}
        else{return 'Neutral'}
    }

    // Jarak 1
    if(
        (min1 === 'Sell'        && now === 'Neutral'    ) ||
        (min1 === 'Neutral'     && now === 'Buy'        ) ||
        (min1 === 'Buy'         && now === 'Strong Buy' ) 
        ){
            if(B===1 && G ===0){return 'Sell'}
            else if(B===1 && G ===1){return 'Buy'}
            else{return 'Neutral'}
        }
    if(
        (min1 === 'Buy'         && now === 'Neutral'    ) ||
        (min1 === 'Neutral'     && now === 'Sell'       ) ||
        (min1 === 'Sell'        && now === 'Strong Sell')
        ){
            if(B===1 && G ===0){return 'Buy'}
            else if(B===1 && G ===1){return 'Sell'}
            else{return 'Neutral'}
        }

    // Jarak 2
    if(
        (min1 === 'Strong Sell'   && now === 'Neutral'        ) ||
        (min1 === 'Sell'          && now === 'Buy'            ) ||
        (min1 === 'Neutral'       && now === 'Strong Buy'     )
        ){
            if(C===1 && G ===0){return 'Sell'}
            else if(C===1 && G ===1){return 'Buy'}
            else{return 'Neutral'}
        }
    if(
        (min1 === 'Strong Buy'    && now === 'Neutral'        ) ||
        (min1 === 'Buy'           && now === 'Sell'           ) ||
        (min1 === 'Neutral'       && now === 'Strong Sell'    )
        ){
            if(C===1 && G ===0){return 'Buy'}
            else if(C===1 && G ===1){return 'Sell'}
            else{return 'Neutral'}
        }

    // Jarak 3
    if(
        (min1 === 'Strong Sell'   && now === 'Buy'            ) ||
        (min1 === 'Sell'          && now === 'Strong Buy'     )
        ){
            if(D===1 && G ===0){return 'Sell'}
            else if(D===1 && G ===1){return 'Buy'}
            else{return 'Neutral'}
        }
    if(
        (min1 === 'Strong Buy'    && now === 'Sell'           ) ||
        (min1 === 'Buy'           && now === 'Strong Sell'    )
        ){
            if(D===1 && G ===0){return 'Buy'}
            else if(D===1 && G ===1){return 'Sell'}
            else{return 'Neutral'}
        }

    // Jarak 4
    if(min1 === 'Strong Sell'   && now === 'Strong Buy'     ){
        if(E===1 && G ===0){return 'Sell'}
        else if(E===1 && G ===1){return 'Buy'}
        else{return 'Neutral'}
    }
    if(min1 === 'Strong Buy'    && now === 'Strong Sell'    ){
        if(E===1 && G ===0){return 'Buy'}
        else if(E===1 && G ===1){return 'Sell'}
        else{return 'Neutral'}
    }
}

module.exports = action