import * as THREE from "three";
export class Pyramid {
    private geometry: THREE.Geometry;
    private scaleFactor: number;
    public constructor(scale: number) {
        this.scaleFactor = scale;
    }
    private createVertices(): void {
        this.geometry.vertices = [
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( -1, 1, 0 ),
            new THREE.Vector3( 1, 1, 0 ),
            new THREE.Vector3( 0 , 0.5, 1 ),
        ];
    }
    private createFaces(): void {
        this.geometry.faces = [
            new THREE.Face3( 0, 1, 2 ),
            new THREE.Face3( 0, 1, 3 ),
            new THREE.Face3( 0, 1, 3 ),
            new THREE.Face3( 1, 2, 3 ),
        ];
    }
    private scale(): void {
        const transformation: THREE.Matrix4 = new THREE.Matrix4().makeScale( this.scaleFactor, this.scaleFactor, this.scaleFactor );
        this.geometry.applyMatrix( transformation );
    }
    public generate(): THREE.Geometry {
        this.geometry = new THREE.Geometry();
        this.createVertices();
        this.createFaces();
        this.scale();

        return this.geometry;
    }
}
