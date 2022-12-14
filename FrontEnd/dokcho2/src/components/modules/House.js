export class House {
  constructor(info) {
    this.x = info.x
    this.y = info.y
    this.z = info.z

    this.visible = false

    info.gltfLoader.load(info.modelSrc, (glb) => {
      this.modelMesh = glb.scene.children[0]
      this.modelMesh.castShadow = true
      this.modelMesh.position.set(this.x, this.y, this.z)
      this.modelMesh.scale.x = 1
      this.modelMesh.scale.y = 1
      this.modelMesh.scale.z = 1
      this.modelMesh.name = 'house'
      info.scene.add(this.modelMesh)
      info.meshes.push(this.modelMesh)
    })
  }
}
