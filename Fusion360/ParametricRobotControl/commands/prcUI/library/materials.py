import adsk.core

def redMaterial():
    color0 = [255,0,0]
    diffuse0 = adsk.core.Color.create(color0[0],color0[1],color0[2],255)
    ambient0 = adsk.core.Color.create(color0[0],color0[1],color0[2],255)
    specular0 = adsk.core.Color.create(255,255,255,255)
    emissive0 = adsk.core.Color.create(0,0,0,255)
    glossy0 = 100
    opacity0 = 1.0
    red = adsk.fusion.CustomGraphicsBasicMaterialColorEffect.create(diffuse0, ambient0, specular0, emissive0, glossy0, opacity0)
    return red
