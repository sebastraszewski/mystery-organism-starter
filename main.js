// Returns a random DNA base
const returnRandBase = (baseMutate) => {
    const dnaBases = ['A', 'T', 'C', 'G'];
    if (baseMutate != undefined) {
        const baseToRemove = dnaBases.findIndex((base) => base == baseMutate)
        dnaBases.splice(baseToRemove, 1)
        return dnaBases[Math.floor(Math.random() * 3)];

    }
    return dnaBases[Math.floor(Math.random() * 4)];

};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
        newStrand.push(returnRandBase());
    }
    return newStrand;
};

const pAequorFactory = (number, arrayDNA) => {
    return {
        specimenNum: number,
        dna: arrayDNA,
        mutate() {
            const mutateArr = []
            for (let base of this.dna) {
                mutateArr.push(returnRandBase(base))
            }
            this.dna = mutateArr
            return this.dna
        },
        compareDNA(object) {
            let perctOfIdentical = 0
            for (let i = 0;i<this.dna.length;i++) {
                if (object.dna[i] == this.dna[i]){
                    perctOfIdentical++
                }
            }
            console.log(`specimen ${this.specimenNum} and specimen ${object.specimenNum} have ${Math.round((perctOfIdentical/15)*100)}% DNA in common'`)
        },
        willLikelySurvive(objectDna){
          let countSurviveBase = 0
          for(let base of objectDna.dna){
            if(base=='C'|| base=='G'){
              countSurviveBase++
            }
          }         
          console.log(`${(Math.round(countSurviveBase*100/15))}% survive dna`)  
          return (Math.round(countSurviveBase*100/15>=60)) ? true : false           
        },
        complementStrand(){
          for(let i = 0;i<this.dna.length;i++){
            if(this.dna[i]=='C'){
              this.dna[i] = 'G'
            } else if (this.dna[i]=='G'){
              this.dna[i] = 'C'
            } else if (this.dna[i]=='A'){
              this.dna[i]='T'
            } else if (this.dna[i]=='T'){
              this.dna[i]='A'
            }
          }
          return this.dna
        }
    }
}

const dna1 = mockUpStrand()
const dna2 = mockUpStrand()
console.log(dna1)
console.log(dna2)
const dna1mut = pAequorFactory(1, dna1)
const dna2mut = pAequorFactory(2, dna2)
dna1mut.compareDNA(dna2mut)
dna1mut.willLikelySurvive(dna1mut)
console.log(dna1mut.dna)
dna1mut.complementStrand()
console.log(dna1mut.dna)
let inst30 = []
for(let i = 0;i<30;i++){
  let dna = mockUpStrand()
  let dnapAequor = pAequorFactory(i,dna)
  if(dnapAequor.willLikelySurvive(dnapAequor)==true){
    inst30.push(dnapAequor)
  } else {
    i--
  }
  dna = []
  
}
;