export function containsLowerCases(s: string): boolean {
  const lowerCase = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(
    ","
  ) // Lower case

  for (const element of lowerCase) {
    for (let j = 0; j < s.length; j++) {
      if (s[j].includes(element)) {
        return true // Return
      }
    }
  }

  return false // Return
}

// Checks if a string contains upper cases
export function containsUpperCases(s: string): boolean {
  const upperCase = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(
    ","
  ) // Upper case

  for (const element of upperCase) {
    for (let j = 0; j < s.length; j++) {
      if (s[j].includes(element)) {
        return true // Return
      }
    }
  }

  return false // Return
}
