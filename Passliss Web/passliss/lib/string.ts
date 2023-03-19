export function containsLowerCases(s: string): boolean {
    let lowerCase = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(","); // Lower case

    for (let i = 0; i < lowerCase.length; i++) {
        for (let j = 0; j < s.length; j++) {
            if (s[j].includes(lowerCase[i])) {
                return true; // Return
            }
        }
    }

    return false; // Return
}

// Checks if a string contains upper cases
export function containsUpperCases(s: string): boolean {
    let upperCase = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(","); // Upper case

    for (let i = 0; i < upperCase.length; i++) {
        for (let j = 0; j < s.length; j++) {
            if (s[j].includes(upperCase[i])) {
                return true; // Return
            }
        }
    }

    return false; // Return
}