class RubiksCube {
    constructor() {
      this.faces = {
        U: Array(9).fill('w'),
        D: Array(9).fill('y'),
        F: Array(9).fill('r'),
        B: Array(9).fill('o'),
        L: Array(9).fill('g'),
        R: Array(9).fill('b')
      };
    }
  
    getCubeStateAsString() {
      return this.faces.U.join('') +
             this.faces.R.join('') +
             this.faces.F.join('') +
             this.faces.D.join('') +
             this.faces.L.join('') +
             this.faces.B.join('');
    }
  
    rotateFaceClockwise(faceKey) {
      const f = this.faces[faceKey];
      this.faces[faceKey] = [f[6], f[3], f[0], f[7], f[4], f[1], f[8], f[5], f[2]];
    }
  
    rotateFrontClockwise() {
      this.rotateFaceClockwise('F');
      const U = this.faces.U, D = this.faces.D, L = this.faces.L, R = this.faces.R;
      const temp = [U[6], U[7], U[8]];
  
      U[6] = L[8]; U[7] = L[5]; U[8] = L[2];
      L[2] = D[0]; L[5] = D[1]; L[8] = D[2];
      D[0] = R[6]; D[1] = R[3]; D[2] = R[0];
      R[0] = temp[2]; R[3] = temp[1]; R[6] = temp[0];
    }
  
    scramble(steps = 20) {
      const moves = [() => this.rotateFrontClockwise()];
      for (let i = 0; i < steps; i++) {
        const move = moves[Math.floor(Math.random() * moves.length)];
        move();
      }
    }




  
    solve() {
      // Reset to solved state
      this.faces = {
        U: Array(9).fill('w'),
        D: Array(9).fill('y'),
        F: Array(9).fill('r'),
        B: Array(9).fill('o'),
        L: Array(9).fill('g'),
        R: Array(9).fill('b')
      };
    }
  }
  
// function to show solve cub
  function getCubeSvg(state) {
    return `<pre style="font-size:20px;">Cube: ${state}</pre>`;
  }
  
  const cube = new RubiksCube();
  
  function displayCube() {
    document.getElementById("cube-visual").innerHTML = getCubeSvg(cube.getCubeStateAsString());
  }
  // function to mix up the cube
  function scrambleCube() {
    cube.scramble();
    displayCube();
  }
  // function to solve the cube after mix up
  function solveCube() {
    cube.solve();
    displayCube();
  }
  
  displayCube(); // Show on load
  
