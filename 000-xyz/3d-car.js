var CallipersControl = pc.createScript("callipersControl");
CallipersControl.attributes.add("models", {
    type: "entity",
    array: !0
}),
CallipersControl.prototype.initialize = function() {
    this.num = 0
}
,
CallipersControl.prototype.changeCallipers = function(t) {
    if (!(this.models.length <= 0)) {
        if (-1 != this.num) {
            if (this.num == t)
                return;
            this.models[this.num].enabled = !1
        }
        this.models[t].enabled = !0,
        this.num = t
    }
}
;
var SelfRotateCamera = pc.createScript("selfRotateCamera");
SelfRotateCamera.attributes.add("pitchAngleMax", {
    type: "number",
    default: 90,
    title: "Pitch Angle Max (degrees)"
}),
SelfRotateCamera.attributes.add("pitchAngleMin", {
    type: "number",
    default: -90,
    title: "Pitch Angle Min (degrees)"
}),
Object.defineProperty(SelfRotateCamera.prototype, "x", {
    get: function() {
        return this._targetPitchX
    },
    set: function(t) {
        this.getMoveValue && (this._targetPitchX = this._clampPitchAngle(t),
        this.num = 0)
    }
}),
Object.defineProperty(SelfRotateCamera.prototype, "y", {
    get: function() {
        return this._targetPitchY
    },
    set: function(t) {
        if (this.getMoveValue) {
            this._targetPitchY = t,
            this.num = 0;
            var e = (this._targetPitchY - this.inity) % 360;
            this._targetPitchY = e > 180 ? this.inity - (360 - e) : e < -180 ? this.inity + (360 + e) : this.inity + e
        }
    }
}),
SelfRotateCamera.attributes.add("inertiaFactor", {
    type: "number",
    default: 0,
    title: "Inertia Factor",
    description: "Higher value means that the camera will continue moving after the user has stopped dragging. 0 is fully responsive."
}),
SelfRotateCamera.attributes.add("delayTime", {
    type: "number",
    default: 0,
    title: "Delay Time",
    description: "进入自动旋转的时间"
}),
SelfRotateCamera.attributes.add("AutoRotateSpeed", {
    type: "number",
    default: .3,
    title: "autoRotateSpeed",
    description: "自动选择的速度"
}),
SelfRotateCamera.attributes.add("getMoveValue", {
    type: "boolean",
    default: !0,
    description: "获取鼠标移动数据"
}),
SelfRotateCamera.prototype.initialize = function() {
    var t = this.entity.getEulerAngles();
    this.initx = t.x,
    this.inity = t.y,
    this._targetPitchX = this.initx,
    this._targetPitchY = this.inity,
    this.num = 0
}
,
SelfRotateCamera.prototype.Init = function(t) {
    this.initx = t.x,
    this.inity = t.y,
    this._targetPitchX = t.x,
    this._targetPitchY = t.y
}
,
SelfRotateCamera.prototype.initData = function() {
    var t = this.entity.getEulerAngles();
    this.initx = t.x,
    this.inity = t.y,
    this._targetPitchX = this.initx,
    this._targetPitchY = this.inity,
    this.num = 0
}
,
SelfRotateCamera.prototype.update = function(t) {
    0 != this.AutoRotateSpeed && this.entity.script.mouseInput && this.entity.script.touchInput && (this.entity.script.mouseInput.ismove || this.entity.script.touchInput.ismove ? this.num = this.delayTime : this.num > 0 ? this.num -= t : this._targetPitchY += .1 * this.AutoRotateSpeed);
    var e = 0 === this.inertiaFactor ? 1 : Math.min(t / this.inertiaFactor, 1);
    this.initx = pc.math.lerp(this.initx, this._targetPitchX, e),
    this.inity = pc.math.lerp(this.inity, this._targetPitchY, e),
    this.entity.setEulerAngles(this.initx, this.inity, 0)
}
,
SelfRotateCamera.prototype._clampPitchAngle = function(t) {
    return pc.math.clamp(t, -this.pitchAngleMax, -this.pitchAngleMin)
}
;
var MouseInput = pc.createScript("mouseInput");
MouseInput.attributes.add("selfRotateSensitivity", {
    type: "number",
    default: .3,
    title: "selfRotate Sensitivity",
    description: "How fast the camera moves around the orbit. Higher is faster"
}),
MouseInput.attributes.add("orbitSensitivity", {
    type: "number",
    default: .3,
    title: "Orbit Sensitivity",
    description: "How fast the camera moves around the orbit. Higher is faster"
}),
MouseInput.attributes.add("distanceSensitivity", {
    type: "number",
    default: .15,
    title: "Distance Sensitivity",
    description: "How fast the camera moves in and out. Higher is faster"
}),
MouseInput.attributes.add("ismove", {
    type: "boolean",
    default: !1,
    title: "旋转开关",
    description: "判断用户是否手动旋转"
}),
MouseInput.attributes.add("isRightMove", {
    type: "boolean",
    default: !0,
    title: "右键移动开关",
    description: "判断是否开启右键移动功能"
}),
MouseInput.prototype.initialize = function() {
    if (this.orbitCamera = this.entity.script.orbitCamera,
    this.selfRotateCamera = this.entity.script.selfRotateCamera,
    this.ismove = !1,
    this.orbitCamera) {
        var t = this
          , onMouseOut = function(o) {
            t.onMouseOut(o)
        };
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this),
        this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this),
        this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this),
        this.app.mouse.on(pc.EVENT_MOUSEWHEEL, this.onMouseWheel, this),
        window.addEventListener("mouseout", onMouseOut, !1),
        this.on("destroy", (function() {
            this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this),
            this.app.mouse.off(pc.EVENT_MOUSEUP, this.onMouseUp, this),
            this.app.mouse.off(pc.EVENT_MOUSEMOVE, this.onMouseMove, this),
            this.app.mouse.off(pc.EVENT_MOUSEWHEEL, this.onMouseWheel, this),
            window.removeEventListener("mouseout", onMouseOut, !1)
        }
        ))
    }
    this.app.mouse.disableContextMenu(),
    this.lookButtonDown = !1,
    this.panButtonDown = !1,
    this.lastPoint = new pc.Vec2
}
,
MouseInput.fromWorldPoint = new pc.Vec3,
MouseInput.toWorldPoint = new pc.Vec3,
MouseInput.worldDiff = new pc.Vec3,
MouseInput.prototype.pan = function(t) {
    var o = MouseInput.fromWorldPoint
      , e = MouseInput.toWorldPoint
      , i = MouseInput.worldDiff
      , s = this.entity.camera
      , n = this.orbitCamera.distance;
    s.screenToWorld(t.x, t.y, n, o),
    s.screenToWorld(this.lastPoint.x, this.lastPoint.y, n, e),
    i.sub2(e, o),
    this.orbitCamera.pivotPoint.add(i)
}
,
MouseInput.prototype.onMouseDown = function(t) {
    switch (this.ismove = !0,
    t.button) {
    case pc.MOUSEBUTTON_LEFT:
        this.lookButtonDown = !0;
        break;
    case pc.MOUSEBUTTON_MIDDLE:
    case pc.MOUSEBUTTON_RIGHT:
        this.panButtonDown = !0
    }
}
,
MouseInput.prototype.onMouseUp = function(t) {
    switch (this.ismove = !1,
    t.button) {
    case pc.MOUSEBUTTON_LEFT:
        this.lookButtonDown = !1;
        break;
    case pc.MOUSEBUTTON_MIDDLE:
    case pc.MOUSEBUTTON_RIGHT:
        this.panButtonDown = !1
    }
}
,
MouseInput.prototype.onMouseUp1 = function() {
    this.ismove = !1,
    this.lookButtonDown = !1
}
,
MouseInput.prototype.onMouseMove = function(t) {
    pc.app.mouse;
    this.lookButtonDown ? (this.orbitCamera.pitch -= t.dy * this.orbitSensitivity,
    this.orbitCamera.yaw -= t.dx * this.orbitSensitivity,
    this.selfRotateCamera.x += t.dy * this.selfRotateSensitivity,
    this.selfRotateCamera.y += t.dx * this.selfRotateSensitivity) : this.panButtonDown && this.isRightMove && this.pan(t),
    this.lastPoint.set(t.x, t.y)
}
,
MouseInput.prototype.onMouseWheel = function(t) {
    this.orbitCamera.distance -= t.wheel * this.distanceSensitivity * (.1 * this.orbitCamera.distance),
    t.event.preventDefault()
}
,
MouseInput.prototype.onMouseOut = function(t) {
    this.lookButtonDown = !1,
    this.panButtonDown = !1,
    this.ismove = !1
}
;
var TouchInput = pc.createScript("touchInput");
TouchInput.attributes.add("orbitSensitivity", {
    type: "number",
    default: .4,
    title: "Orbit Sensitivity",
    description: "How fast the camera moves around the orbit. Higher is faster"
}),
TouchInput.attributes.add("distanceSensitivity", {
    type: "number",
    default: .2,
    title: "Distance Sensitivity",
    description: "How fast the camera moves in and out. Higher is faster"
}),
TouchInput.attributes.add("selfRotateSensitivity", {
    type: "number",
    default: .3,
    title: "selfRotate Sensitivity",
    description: "How fast the camera moves around the orbit. Higher is faster"
}),
TouchInput.attributes.add("ismove", {
    type: "boolean",
    default: !1,
    title: "旋转开关",
    description: "判断用户是否手动旋转"
}),
TouchInput.attributes.add("isRightMove", {
    type: "boolean",
    default: !0,
    title: "右键移动开关",
    description: "判断是否开启右键移动功能"
}),
TouchInput.prototype.initialize = function() {
    this.orbitCamera = this.entity.script.orbitCamera,
    this.selfRotateCamera = this.entity.script.selfRotateCamera,
    this.ismove = !1,
    this.isMask = !1,
    this.lastTouchPoint = new pc.Vec2,
    this.lastPinchMidPoint = new pc.Vec2,
    this.lastPinchDistance = 0,
    this.orbitCamera && this.app.touch && (this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this),
    this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchEndCancel, this),
    this.app.touch.on(pc.EVENT_TOUCHCANCEL, this.onTouchEndCancel, this),
    this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this),
    this.on("destroy", (function() {
        this.app.touch.off(pc.EVENT_TOUCHSTART, this.onTouchStart, this),
        this.app.touch.off(pc.EVENT_TOUCHEND, this.onTouchEndCancel, this),
        this.app.touch.off(pc.EVENT_TOUCHCANCEL, this.onTouchEndCancel, this),
        this.app.touch.off(pc.EVENT_TOUCHMOVE, this.onTouchMove, this)
    }
    )))
}
,
TouchInput.prototype.getPinchDistance = function(t, i) {
    var o = t.x - i.x
      , s = t.y - i.y;
    return Math.sqrt(o * o + s * s)
}
,
TouchInput.prototype.calcMidPoint = function(t, i, o) {
    o.set(i.x - t.x, i.y - t.y),
    o.scale(.5),
    o.x += t.x,
    o.y += t.y
}
,
TouchInput.prototype.onTouchStart = function(t) {
    t.event.preventDefault();
    var i = t.touches;
    this.ismove = !0,
    1 == i.length ? this.lastTouchPoint.set(i[0].x, i[0].y) : 2 == i.length && (this.lastPinchDistance = this.getPinchDistance(i[0], i[1]),
    this.calcMidPoint(i[0], i[1], this.lastPinchMidPoint))
}
,
TouchInput.prototype.onTouchEndCancel = function(t) {
    this.ismove = !1;
    var i = t.touches;
    1 == i.length ? this.lastTouchPoint.set(i[0].x, i[0].y) : 2 == i.length && (this.lastPinchDistance = this.getPinchDistance(i[0], i[1]),
    this.calcMidPoint(i[0], i[1], this.lastPinchMidPoint))
}
,
TouchInput.prototype.onTouchEndCancel1 = function() {
    this.ismove = !1
}
,
TouchInput.fromWorldPoint = new pc.Vec3,
TouchInput.toWorldPoint = new pc.Vec3,
TouchInput.worldDiff = new pc.Vec3,
TouchInput.prototype.pan = function(t) {
    var i = TouchInput.fromWorldPoint
      , o = TouchInput.toWorldPoint
      , s = TouchInput.worldDiff
      , e = this.entity.camera
      , n = this.orbitCamera.distance;
    e.screenToWorld(t.x, t.y, n, i),
    e.screenToWorld(this.lastPinchMidPoint.x, this.lastPinchMidPoint.y, n, o),
    s.sub2(o, i),
    this.orbitCamera.pivotPoint.add(s)
}
,
TouchInput.pinchMidPoint = new pc.Vec2,
TouchInput.prototype.onTouchMove = function(t) {
    var i = TouchInput.pinchMidPoint;
    if (!this.isMask) {
        var o = t.touches;
        if (1 == o.length) {
            var s = o[0];
            this.orbitCamera.pitch -= (s.y - this.lastTouchPoint.y) * this.orbitSensitivity,
            this.orbitCamera.yaw -= (s.x - this.lastTouchPoint.x) * this.orbitSensitivity,
            this.selfRotateCamera.x += (s.y - this.lastTouchPoint.y) * this.selfRotateSensitivity,
            this.selfRotateCamera.y += (s.x - this.lastTouchPoint.x) * this.selfRotateSensitivity,
            this.lastTouchPoint.set(s.x, s.y)
        } else if (2 == o.length) {
            var e = this.getPinchDistance(o[0], o[1])
              , n = e - this.lastPinchDistance;
            this.lastPinchDistance = e,
            this.orbitCamera.distance -= n * this.distanceSensitivity * .1 * (.1 * this.orbitCamera.distance),
            this.isRightMove && (this.calcMidPoint(o[0], o[1], i),
            this.pan(i),
            this.lastPinchMidPoint.copy(i))
        }
    }
}
;
var OrbitCamera = pc.createScript("orbitCamera");
OrbitCamera.attributes.add("distanceMax", {
    type: "number",
    default: 0,
    title: "Distance Max",
    description: "Setting this at 0 will give an infinite distance limit"
}),
OrbitCamera.attributes.add("distanceMin", {
    type: "number",
    default: 0,
    title: "Distance Min"
}),
OrbitCamera.attributes.add("pitchAngleMax", {
    type: "number",
    default: 90,
    title: "Pitch Angle Max (degrees)"
}),
OrbitCamera.attributes.add("pitchAngleMin", {
    type: "number",
    default: -90,
    title: "Pitch Angle Min (degrees)"
}),
OrbitCamera.attributes.add("yawAngleClamp", {
    type: "vec2",
    default: [-180, 180],
    title: "Pitch Angle Min (degrees)"
}),
OrbitCamera.attributes.add("inertiaFactor", {
    type: "number",
    default: 0,
    title: "Inertia Factor",
    description: "Higher value means that the camera will continue moving after the user has stopped dragging. 0 is fully responsive."
}),
OrbitCamera.attributes.add("focusEntity", {
    type: "entity",
    title: "Focus Entity",
    description: "Entity for the camera to focus on. If blank, then the camera will use the whole scene"
}),
OrbitCamera.attributes.add("delayTime", {
    type: "number",
    default: 0,
    title: "Delay Time",
    description: "进入自动旋转的时间"
}),
OrbitCamera.attributes.add("AutoRotateSpeed", {
    type: "number",
    default: .3,
    title: "rotateSpeed",
    description: "自动选择的速度"
}),
OrbitCamera.attributes.add("frameOnStart", {
    type: "boolean",
    default: !0,
    title: "Frame on Start",
    description: 'Frames the entity or scene at the start of the application."'
}),
OrbitCamera.attributes.add("isClampYaw", {
    type: "boolean",
    default: !1,
    description: '是否限制相机左右旋转"'
}),
Object.defineProperty(OrbitCamera.prototype, "distance", {
    get: function() {
        return this._targetDistance
    },
    set: function(t) {
        this._targetDistance = this._clampDistance(t)
    }
}),
Object.defineProperty(OrbitCamera.prototype, "pitch", {
    get: function() {
        return this._targetPitch
    },
    set: function(t) {
        this.getMoveValue && (this._targetPitch = this._clampPitchAngle(t))
    }
}),
Object.defineProperty(OrbitCamera.prototype, "yaw", {
    get: function() {
        return this._targetYaw
    },
    set: function(t) {
        this.getMoveValue && (this._targetYaw = t,
        this._targetYaw = this._clampYawAngle(this._targetYaw))
    }
}),
Object.defineProperty(OrbitCamera.prototype, "pivotPoint", {
    get: function() {
        return this._pivotPoint
    },
    set: function(t) {
        this._pivotPoint.copy(t)
    }
}),
OrbitCamera.attributes.add("getMoveValue", {
    type: "boolean",
    default: !0,
    description: "获取鼠标移动数据"
}),
OrbitCamera.prototype.focus = function(t) {
    this._buildAabb(t, 0);
    var i = this._modelsAabb.halfExtents
      , e = Math.max(i.x, Math.max(i.y, i.z));
    e /= Math.tan(.5 * this.entity.camera.fov * pc.math.DEG_TO_RAD),
    e *= 2,
    this.distance = e,
    this._removeInertia(),
    this._pivotPoint.copy(this._modelsAabb.center)
}
,
OrbitCamera.distanceBetween = new pc.Vec3,
OrbitCamera.prototype.resetAndLookAtPoint = function(t, i) {
    this.pivotPoint.copy(i),
    this.entity.setPosition(t),
    this.entity.lookAt(i);
    var e = OrbitCamera.distanceBetween;
    e.sub2(i, t),
    this.distance = e.length(),
    this.pivotPoint.copy(i);
    var a = this.entity.getRotation();
    this.yaw = this._calcYaw(a),
    this.pitch = this._calcPitch(a, this.yaw),
    this._removeInertia(),
    this._updatePosition()
}
,
OrbitCamera.prototype.resetAndLookAtEntity = function(t, i) {
    this._buildAabb(i, 0),
    this.resetAndLookAtPoint(t, this._modelsAabb.center)
}
,
OrbitCamera.prototype.resetAndLookAtEntity1 = function(t, i) {
    this.focusEntity = i,
    this._buildAabb(this.focusEntity, 0);
    var e = this._modelsAabb.center;
    this.pivotPoint.copy(e);
    var a = OrbitCamera.distanceBetween;
    a.sub2(e, t),
    this.distance = a.length(),
    this.pivotPoint.copy(e);
    var s = this.entity.getRotation();
    this.yaw = this._calcYaw(s),
    this.pitch = this._calcPitch(s, this.yaw)
}
,
OrbitCamera.prototype.reset = function(t, i, e) {
    this.pitch = i,
    this.yaw = t,
    this.distance = e,
    this._removeInertia()
}
,
OrbitCamera.prototype.initialize = function() {
    var t = this;
    this.isClampYaw = !1;
    window.addEventListener("resize", (function() {
        t._checkAspectRatio()
    }
    ), !1),
    this.init(!0)
}
,
OrbitCamera.prototype.init = function(t) {
    this.num = 0,
    this._checkAspectRatio(),
    this._modelsAabb = new pc.BoundingBox,
    this._buildAabb(this.focusEntity || this.app.root, 0),
    t ? this.entity.lookAt(this._modelsAabb.center) : console.log(this._modelsAabb.center),
    this._pivotPoint = new pc.Vec3,
    this._pivotPoint.copy(this._modelsAabb.center);
    var i = this.entity.getRotation();
    if (t) {
        if (this._yaw = this._calcYaw(i),
        this._pitch = this._clampPitchAngle(this._calcPitch(i, this._yaw)),
        this.entity.setLocalEulerAngles(this._pitch, this._yaw, 0),
        this._targetYaw = this._yaw,
        this._targetPitch = this._pitch,
        this._distance = this.distanceMax,
        this.frameOnStart)
            this.focus(this.focusEntity || this.app.root);
        else
            (e = new pc.Vec3).sub2(this.entity.getPosition(), this._pivotPoint),
            this._distance = this._clampDistance(e.length());
        this._targetDistance = this._distance
    } else {
        var e;
        this.yaw = this._calcYaw(i),
        this.pitch = this._clampPitchAngle(this._calcPitch(i, this.yaw)),
        this._pivotPoint.copy(this._modelsAabb.center),
        (e = new pc.Vec3).sub2(this.entity.getPosition(), this._pivotPoint),
        this._targetDistance = this._clampDistance(e.length())
    }
}
,
OrbitCamera.prototype.update = function(t) {
    0 != this.AutoRotateSpeed && this.entity.script.mouseInput && this.entity.script.touchInput && (this.entity.script.mouseInput.ismove || this.entity.script.touchInput.ismove ? this.num = this.delayTime : this.num > 0 ? this.num -= t : this.yaw -= .1 * this.AutoRotateSpeed);
    var i = 0 === this.inertiaFactor ? 1 : Math.min(t / this.inertiaFactor, 1);
    this._distance = pc.math.lerp(this._distance, this._targetDistance, i),
    this._yaw = pc.math.lerp(this._yaw, this._targetYaw, i),
    this._pitch = pc.math.lerp(this._pitch, this._targetPitch, i),
    this._updatePosition()
}
,
OrbitCamera.prototype.initXY = function() {
    var t = this.pitch
      , i = this.yaw;
    t %= 360,
    i %= 360,
    this._yaw = i,
    this._pitch = t,
    this.pitch = t,
    this.yaw = i
}
,
OrbitCamera.prototype._updatePosition = function() {
    this.entity.setLocalPosition(0, 0, 0),
    this.entity.setLocalEulerAngles(this._pitch, this._yaw, 0);
    var t = this.entity.getPosition();
    t.copy(this.entity.forward),
    t.scale(-this._distance),
    t.add(this.pivotPoint),
    this.entity.setPosition(t)
}
,
OrbitCamera.prototype._removeInertia = function() {
    this._yaw = this._targetYaw,
    this._pitch = this._targetPitch,
    this._distance = this._targetDistance
}
,
OrbitCamera.prototype._checkAspectRatio = function() {
    var t = this.app.graphicsDevice.height
      , i = this.app.graphicsDevice.width;
    this.entity.camera.horizontalFov = t > i
}
,
OrbitCamera.prototype._buildAabb = function(t, i) {
    var e = 0;
    if (t.model) {
        var a = t.model.meshInstances;
        if (a)
            for (e = 0; e < a.length; e++)
                0 === i ? this._modelsAabb.copy(a[e].aabb) : this._modelsAabb.add(a[e].aabb),
                i += 1
    }
    for (e = 0; e < t.children.length; ++e)
        i += this._buildAabb(t.children[e], i);
    return i
}
,
OrbitCamera.prototype._calcYaw = function(t) {
    var i = new pc.Vec3;
    return t.transformVector(pc.Vec3.FORWARD, i),
    Math.atan2(-i.x, -i.z) * pc.math.RAD_TO_DEG
}
,
OrbitCamera.prototype._clampDistance = function(t) {
    return this.distanceMax > 0 ? pc.math.clamp(t, this.distanceMin, this.distanceMax) : Math.max(t, this.distanceMin)
}
,
OrbitCamera.prototype._clampPitchAngle = function(t) {
    return pc.math.clamp(t, -this.pitchAngleMax, -this.pitchAngleMin)
}
,
OrbitCamera.prototype._clampYawAngle = function(t) {
    return this.isClampYaw ? pc.math.clamp(t, -this.yawAngleClamp.y, -this.yawAngleClamp.x) : t
}
,
OrbitCamera.quatWithoutYaw = new pc.Quat,
OrbitCamera.yawOffset = new pc.Quat,
OrbitCamera.prototype._calcPitch = function(t, i) {
    var e = OrbitCamera.quatWithoutYaw
      , a = OrbitCamera.yawOffset;
    a.setFromEulerAngles(0, -i, 0),
    e.mul2(a, t);
    var s = new pc.Vec3;
    return e.transformVector(pc.Vec3.FORWARD, s),
    Math.atan2(s.y, -s.z) * pc.math.RAD_TO_DEG
}
;
var CarColorControl = pc.createScript("carColorControl");
CarColorControl.attributes.add("models", {
    type: "entity",
    array: !0
}),
CarColorControl.attributes.add("colorMaterials", {
    type: "json",
    schema: [{
        name: "bonnet",
        type: "asset",
        assetType: "material",
        array: !0
    }, {
        name: "radar",
        type: "asset",
        assetType: "material",
        array: !0
    }]
}),
CarColorControl.prototype.changeColor = function(e) {
    console.log(e),
    this.models[0].model.meshInstances[0].material = this.colorMaterials.bonnet[e].resource,
    this.models[1].model.meshInstances[0].material = this.colorMaterials.bonnet[e].resource,
    this.models[2].model.meshInstances[0].material = this.colorMaterials.bonnet[e].resource,
    this.models[3].model.meshInstances[0].material = this.colorMaterials.bonnet[e].resource,
    this.models[4].model.meshInstances[0].material = this.colorMaterials.bonnet[e].resource,
    this.models[5].render.meshInstances[0].material = this.colorMaterials.bonnet[e].resource,
    this.models[6].render.meshInstances[0].material = this.colorMaterials.bonnet[e].resource,
    this.models[7].model.meshInstances[0].material = this.colorMaterials.bonnet[e].resource,
    this.models[8].render.meshInstances[0].material = this.colorMaterials.bonnet[e].resource,
    this.models[9].render.meshInstances[0].material = this.colorMaterials.bonnet[e].resource,
    this.models[10].model.meshInstances[15].material = this.colorMaterials.radar[e].resource
}
;
var HubControl = pc.createScript("hubControl");
HubControl.attributes.add("models", {
    type: "entity",
    array: !0
}),
HubControl.attributes.add("speed", {
    type: "number",
    default: 10
}),
HubControl.prototype.initialize = function() {
    this.num = 0,
    this.isMove = !1,
    this.array = this.models[0].children,
    this.posValue = 0
}
,
HubControl.prototype.changeHub = function(t) {
    if (!(this.models.length <= 0)) {
        if (-1 != this.num) {
            if (this.num == t)
                return;
            this.models[this.num].enabled = !1
        }
        this.models[t].enabled = !0,
        this.num = t
    }
}
,
HubControl.prototype.changeCarHubRun = function(t) {
    if (t)
        this.array = this.models[this.num].children,
        this.isMove = t;
    else if (null != this.array) {
        this.isMove = t;
        for (var e = 0; e < 4; e++)
            this.array[e].setEulerAngles(new pc.Vec3(0,0,0));
        this.posValue = 0,
        this.array = null
    }
}
,
HubControl.prototype.update = function(t) {
    if (this.isMove) {
        this.posValue += t * this.speed,
        this.posValue > 360 && (this.posValue -= 360);
        for (var e = 0; e < 4; e++)
            this.array[e].setEulerAngles(new pc.Vec3(0,0,this.posValue))
    }
}
;
var TweenRotate = pc.createScript("tweenRotate");
TweenRotate.attributes.add("openRotate", {
    type: "vec3"
}),
TweenRotate.attributes.add("closeRotate", {
    type: "vec3"
}),
TweenRotate.attributes.add("easing", {
    type: "string",
    default: "Linear"
}),
TweenRotate.attributes.add("speed", {
    type: "number",
    default: 1
}),
TweenRotate.prototype.initialize = function() {
    this.tween = null
}
,
TweenRotate.prototype.setRotate = function(t) {
    t ? this.startTween(this.openRotate) : this.startTween(this.closeRotate)
}
,
TweenRotate.prototype.startTween = function(t) {
    this.tween && this.tween.stop();
    var e = this;
    this.tween = this.entity.tween(this.entity.getLocalEulerAngles()).rotate(t, this.speed, pc[this.easing]).on("complete", (function() {
        e.tween = null
    }
    )),
    this.tween.start()
}
;
var TurnControl = pc.createScript("turnControl");
TurnControl.attributes.add("doors", {
    type: "entity",
    array: !0
}),
TurnControl.attributes.add("size", {
    type: "entity"
}),
TurnControl.attributes.add("window", {
    type: "entity",
    array: !0
}),
TurnControl.attributes.add("trunk", {
    type: "entity",
    array: !0
}),
TurnControl.attributes.add("trunkPos", {
    type: "vec2",
    array: !0
}),
TurnControl.attributes.add("lightMat", {
    type: "asset",
    assetType: "material",
    array: !0
}),
TurnControl.attributes.add("pos", {
    type: "vec2"
}),
TurnControl.attributes.add("bigLight", {
    type: "entity"
}),
TurnControl.prototype.initialize = function() {
    this.cameraChange = this.entity.script.cameraChange,
    this.num = -1,
    this.nowPos1 = new pc.Vec2(this.pos.x,this.pos.y),
    this.nowPos2 = new pc.Vec2(this.pos.x,this.pos.y),
    this.nowtrunkPos = new pc.Vec2(this.trunkPos.x,this.trunkPos.y),
    this.light1 = 0,
    this.light2 = 0,
    this.tween_light1 = null,
    this.tween_light2 = null,
    this.tween_trunk1 = null,
    this.tween_trunk2 = null,
    this.lightSatae = !1,
    this.windowState = !1,
    this.trunkState = !1,
    this.doorState = !1,
    this.hostState = !0,
    this.windowState1 = !1,
    this.lightStates = [!1, !1],
    this.doorStates = [!1, !1, !1, !1],
    this.trunkStates = [!1, !1];
    var t = this;
    this.app.on("turn:Chick", (function(e) {
        t.hostChick(e)
    }
    ), this)
}
,
TurnControl.prototype.changeTurn = function(t) {
    0 == t ? this.changeLight() : 1 == t ? this.changeDoor() : 2 == t ? this.changeWindow() : 3 == t ? this.changeTrunk() : 4 == t ? this.changeSize(!0) : 5 == t && this.changeSize(!1),
    this.num = t
}
,
TurnControl.prototype.hostChick = function(t) {
    switch (t.name) {
    case "door":
        this.changeSelfDoor(t.num);
        break;
    case "trunk":
        0 == t.num ? (this.trunkStates[0] = !this.trunkStates[0],
        this.trunkStates[0] ? this.openTrunk2() : this.closeTrunk2()) : 1 == t.num && (this.trunkStates[1] = !this.trunkStates[1],
        this.trunkStates[1] ? this.openTrunk1() : this.closeTrunk1());
        break;
    case "light":
        0 == t.num ? (this.lightStates[0] = !this.lightStates[0],
        this.lightStates[0] ? this.openLight1() : this.closeLight1()) : 1 == t.num && (this.lightStates[1] = !this.lightStates[1],
        this.lightStates[1] ? this.openLight2() : this.closeLight2());
        break;
    case "trimPos":
        this.cameraChange.changeSelfPos(t.num);
        break;
    case "windows":
        this.changeWindow1()
    }
}
,
TurnControl.prototype.trunInit = function() {
    this.lightSatae = !0,
    this.changeTurn(0),
    this.doorState = !0,
    this.changeTurn(1),
    this.windowState = !0,
    this.changeTurn(2),
    this.trunkState = !0,
    this.changeTurn(3)
}
,
TurnControl.prototype.changeLight = function() {
    this.lightSatae = !this.lightSatae,
    this.lightSatae ? (this.openLight1(),
    this.openLight2()) : (this.closeLight1(),
    this.closeLight2())
}
,
TurnControl.prototype.changeSelfLight = function(t) {
    this.lightSatae = !this.lightSatae,
    this.lightSatae ? (this.openLight1(),
    this.openLight2()) : (this.closeLight1(),
    this.closeLight2())
}
,
TurnControl.prototype.openLight1 = function() {
    this.lightStates[0] = !0,
    this.tween_light1 && this.tween_light1.stop();
    var t = this
      , e = this.nowPos1;
    0 == this.light1 ? this.tween_light1 = this.app.tween(e).to(new pc.Vec2(this.pos.y,0), .5, pc.Linear).on("update", (function() {
        var n = t.lightMat[0].resource;
        n.emissiveMapOffset = new pc.Vec2(e.x,0),
        n.update()
    }
    )).on("complete", (function() {
        t.light1 = 1,
        t.nowPos1 = new pc.Vec2(.5,0),
        t.openLight1()
    }
    )) : this.tween_light1 = this.app.tween(e).to(new pc.Vec2(this.pos.y,0), 1.5, pc.Linear).on("update", (function() {
        var n = t.lightMat[2].resource;
        n.emissiveMapOffset = new pc.Vec2(e.x,0),
        n.update()
    }
    )).on("complete", (function() {
        t.tween_light1 = null,
        t.bigLight.enabled = !0
    }
    )),
    this.tween_light1.start()
}
,
TurnControl.prototype.closeLight1 = function() {
    this.lightStates[0] = !1,
    this.tween_light1 && this.tween_light1.stop();
    var t = this
      , e = this.nowPos1;
    0 == this.light1 ? this.tween_light1 = this.app.tween(e).to(new pc.Vec2(this.pos.x,0), .5, pc.Linear).on("update", (function() {
        var n = t.lightMat[0].resource;
        n.emissiveMapOffset = new pc.Vec2(e.x,0),
        n.update()
    }
    )).on("complete", (function() {
        t.tween_light1 = null
    }
    )) : (this.bigLight.enabled = !1,
    this.tween_light1 = this.app.tween(e).to(new pc.Vec2(this.pos.x,0), 1.5, pc.Linear).on("update", (function() {
        var n = t.lightMat[2].resource;
        n.emissiveMapOffset = new pc.Vec2(e.x,0),
        n.update()
    }
    )).on("complete", (function() {
        t.nowPos1 = new pc.Vec2(0,0),
        t.tween = null,
        t.light1 = 0,
        t.closeLight1()
    }
    ))),
    this.tween_light1.start()
}
,
TurnControl.prototype.openLight2 = function() {
    this.lightStates[1] = !0,
    this.tween_light2 && this.tween_light2.stop();
    var t = this
      , e = this.nowPos2;
    0 == this.light2 ? this.tween_light2 = this.app.tween(e).to(new pc.Vec2(this.pos.y,0), .5, pc.Linear).on("update", (function() {
        var n = t.lightMat[1].resource;
        n.emissiveMapOffset = new pc.Vec2(.5 - e.x,0),
        n.update()
    }
    )).on("complete", (function() {
        t.light2 = 1,
        t.nowPos2 = new pc.Vec2(.5,0),
        t.openLight2()
    }
    )) : this.tween_light2 = this.app.tween(e).to(new pc.Vec2(this.pos.y,0), 1.5, pc.Linear).on("update", (function() {
        var n = t.lightMat[3].resource;
        n.emissiveMapOffset = new pc.Vec2(e.x,0),
        n.update()
    }
    )).on("complete", (function() {
        t.tween_light2 = null
    }
    )),
    this.tween_light2.start()
}
,
TurnControl.prototype.closeLight2 = function() {
    this.lightStates[1] = !1,
    this.tween_light2 && this.tween_light2.stop();
    var t = this
      , e = this.nowPos2;
    0 == this.light2 ? this.tween_light2 = this.app.tween(e).to(new pc.Vec2(this.pos.x,0), .5, pc.Linear).on("update", (function() {
        var n = t.lightMat[1].resource;
        n.emissiveMapOffset = new pc.Vec2(.5 - e.x,0),
        n.update()
    }
    )).on("complete", (function() {
        t.tween_light2 = null
    }
    )) : this.tween_light2 = this.app.tween(e).to(new pc.Vec2(this.pos.x,0), 1.5, pc.Linear).on("update", (function() {
        var n = t.lightMat[3].resource;
        n.emissiveMapOffset = new pc.Vec2(e.x,0),
        n.update()
    }
    )).on("complete", (function() {
        t.nowPos2 = new pc.Vec2(0,0),
        t.tween = null,
        t.light2 = 0,
        t.closeLight2()
    }
    )),
    this.tween_light2.start()
}
,
TurnControl.prototype.changeWindow = function() {
    this.windowState = !this.windowState,
    this.windowState1 = this.windowState;
    for (var t = 0; t < this.window.length; t++)
        this.windowState ? this.window[t].animation.speed = 1 : this.window[t].animation.speed = -1,
        this.window[t].animation.play("open.glb", 1)
}
,
TurnControl.prototype.changeWindow1 = function() {
    this.windowState1 = !this.windowState1;
    for (var t = 0; t < this.window.length; t++)
        this.windowState1 ? this.window[t].animation.speed = 1 : this.window[t].animation.speed = -1,
        this.window[t].animation.play("open.glb", 1)
}
,
TurnControl.prototype.changeDoor = function() {
    this.doorState = !this.doorState;
    for (var t = 0; t < this.doors.length; t++)
        this.doorStates[t] = this.doorState,
        this.doors[t].script.tweenRotate.setRotate(this.doorState)
}
,
TurnControl.prototype.changeSelfDoor = function(t) {
    this.doorStates[t] = !this.doorStates[t],
    this.doors[t].script.tweenRotate.setRotate(this.doorStates[t])
}
,
TurnControl.prototype.changeSelfDoor2 = function(t, e) {
    this.doorStates[t] != e && (this.doorStates[t] = e,
    this.doors[t].script.tweenRotate.setRotate(this.doorStates[t]))
}
,
TurnControl.prototype.changeTrunk = function() {
    this.trunkState = !this.trunkState,
    this.trunkState ? (this.openTrunk1(),
    this.openTrunk2()) : (this.closeTrunk1(),
    this.closeTrunk2())
}
,
TurnControl.prototype.openTrunk1 = function() {
    this.trunkStates[1] = !0,
    this.tween_trunk1 && this.tween_trunk1.stop();
    var t = this
      , e = this.trunk[0].getLocalEulerAngles()
      , n = new pc.Vec3(e.x,e.y,e.z);
    this.tween_trunk1 = this.app.tween(n).to(new pc.Vec3(0,0,this.trunkPos[0].x), 2, pc.Linear).on("update", (function() {
        t.trunk[0].setLocalEulerAngles(0, 0, n.z)
    }
    )).on("complete", (function() {
        console.log("closeWC"),
        t.tween_trunk1 = null
    }
    )),
    this.tween_trunk1.start()
}
,
TurnControl.prototype.closeTrunk1 = function() {
    this.trunkStates[1] = !1,
    this.tween_trunk1 && this.tween_trunk1.stop();
    var t = this
      , e = this.trunk[0].getLocalEulerAngles()
      , n = new pc.Vec3(e.x,e.y,e.z);
    this.tween_trunk1 = this.app.tween(n).to(new pc.Vec3(0,0,this.trunkPos[0].y), 2, pc.Linear).on("update", (function() {
        t.trunk[0].setLocalEulerAngles(0, 0, n.z)
    }
    )).on("complete", (function() {
        console.log("closeWC"),
        t.tween_trunk1 = null
    }
    )),
    this.tween_trunk1.start()
}
,
TurnControl.prototype.openTrunk2 = function() {
    this.trunkStates[0] = !0,
    this.tween_trunk2 && this.tween_trunk2.stop();
    var t = this
      , e = this.trunk[1].getLocalEulerAngles()
      , n = new pc.Vec3(e.x,e.y,e.z);
    this.tween_trunk2 = this.app.tween(n).to(new pc.Vec3(0,0,this.trunkPos[1].x), 2, pc.Linear).on("update", (function() {
        t.trunk[1].setLocalEulerAngles(0, 0, n.z)
    }
    )).on("complete", (function() {
        console.log("closeWC"),
        t.tween_trunk2 = null
    }
    )),
    this.tween_trunk2.start()
}
,
TurnControl.prototype.closeTrunk2 = function() {
    this.trunkStates[1] = !1,
    this.tween_trunk2 && this.tween_trunk2.stop();
    var t = this
      , e = this.trunk[1].getLocalEulerAngles()
      , n = new pc.Vec3(e.x,e.y,e.z);
    this.tween_trunk2 = this.app.tween(n).to(new pc.Vec3(0,0,this.trunkPos[1].y), 2, pc.Linear).on("update", (function() {
        t.trunk[1].setLocalEulerAngles(0, 0, n.z)
    }
    )).on("complete", (function() {
        console.log("closeWC"),
        t.tween_trunk2 = null
    }
    )),
    this.tween_trunk2.start()
}
,
TurnControl.prototype.changeSize = function(t) {
    this.size.enabled = t
}
,
TurnControl.prototype.changeHost = function() {}
;
var LookCamera = pc.createScript("lookCamera");
LookCamera.attributes.add("cameraEntity", {
    type: "entity"
}),
LookCamera.prototype.initialize = function() {}
,
LookCamera.prototype.update = function(t) {
    var a = this.cameraEntity.getPosition();
    this.entity.lookAt(a)
}
;
var TrimControl = pc.createScript("trimControl");
TrimControl.attributes.add("trims", {
    type: "json",
    schema: [{
        name: "model",
        type: "entity",
        array: !0
    }, {
        name: "seat",
        type: "entity",
        array: !0
    }],
    array: !0
}),
TrimControl.prototype.initialize = function() {
    this.nowTrim = 2,
    this.nowSeat = 0,
    this.initTrimColor()
}
,
TrimControl.prototype.initTrimColor = function() {
    for (var t = 0; t < this.trims.length; t++)
        for (var i = this.trims[t].model, r = 0; r < i.length; r++)
            i[r].enabled = !1;
    for (var o = this.trims[this.nowTrim].model, n = 0; n < o.length; n++)
        o[n].enabled = !0
}
,
TrimControl.prototype.changeTrimColor = function(t) {
    if (this.nowTrim != t) {
        for (var i = this.trims[this.nowTrim].model, r = 0; r < i.length; r++)
            i[r].enabled = !1;
        for (var o = this.trims[t].model, n = 0; n < o.length; n++)
            o[n].enabled = !0;
        this.nowTrim = t,
        1 == t ? this.nowSeat = 0 : 0 == t && (this.nowSeat = 1),
        this.initSeat()
    }
}
,
TrimControl.prototype.changeSeat = function(t) {
    var i = this.trims[this.nowTrim].seat[this.nowSeat];
    null != i && (i.enabled = !1);
    var r = this.trims[this.nowTrim].seat[t];
    null != r && (r.enabled = !0),
    this.nowSeat = t
}
,
TrimControl.prototype.initSeat = function() {
    for (var t = this.trims[this.nowTrim].seat, i = 0; i < t.length; i++)
        null != t[i] && (t[i].enabled = !1);
    t[this.nowSeat].enabled = !0
}
;
var OtherControl = pc.createScript("otherControl");
OtherControl.attributes.add("empennage", {
    type: "entity",
    array: !0
}),
OtherControl.attributes.add("part", {
    type: "json",
    schema: [{
        name: "models",
        type: "entity",
        array: !0
    }, {
        name: "logo",
        type: "entity",
        array: !0
    }],
    array: !0
}),
OtherControl.attributes.add("partMat", {
    type: "asset",
    assetType: "material",
    array: !0
}),
OtherControl.prototype.initialize = function() {
    this.partState = !1,
    this.empennageNum = 0
}
,
OtherControl.prototype.changePart = function() {
    if (!(this.part.length <= 0)) {
        this.partState = !this.partState;
        for (var t = this.part[0].models, e = 0; e < t.length; e++)
            t[e].enabled = !this.partState;
        for (var a = this.part[1].models, r = 0; r < a.length; r++)
            a[r].enabled = this.partState
    }
}
,
OtherControl.prototype.setPart = function(t) {
    if (0 == t) {
        for (var e = this.part[0].models, a = 0; a < e.length; a++)
            e[a].enabled = !0;
        for (var r = this.part[1].models, o = 0; o < r.length; o++)
            r[o].enabled = !1
    } else if (1 == t) {
        for (var s = this.part[0].models, n = 0; n < s.length; n++)
            s[n].enabled = !1;
        for (var l = this.part[1].models, h = 0; h < l.length; h++)
            l[h].enabled = !0
    }
}
,
OtherControl.prototype.openLogo = function(t, e) {
    var a = this.part[t].logo;
    if (a.length > 0)
        for (var r = 0; r < a.length; r++)
            a[r].enabled = e;
    1 != t && 2 != t || (e ? (this.part[1].models[0].model.meshInstances[0].material = this.partMat[1].resource,
    this.part[1].models[1].model.meshInstances[0].material = this.partMat[1].resource,
    this.part[1].models[4].model.meshInstances[0].material = this.partMat[1].resource) : (this.part[1].models[0].model.meshInstances[0].material = this.partMat[0].resource,
    this.part[1].models[1].model.meshInstances[0].material = this.partMat[2].resource,
    this.part[1].models[4].model.meshInstances[0].material = this.partMat[2].resource))
}
,
OtherControl.prototype.controlLogo = function(t) {
    this.part[1].models[2].enabled = t,
    this.part[1].models[3].enabled = t,
    this.part[0].models[2].enabled = t,
    this.part[0].models[3].enabled = t
}
,
OtherControl.prototype.changeEmpennage = function(t) {
    this.part.length <= 0 || this.empennageNum != t && (this.empennage[this.empennageNum].enabled = !1,
    this.empennage[t].enabled = !0,
    this.empennageNum = t)
}
;
var BrightControl = pc.createScript("brightControl");
BrightControl.attributes.add("hosts", {
    type: "entity",
    array: !0
}),
BrightControl.attributes.add("cam", {
    type: "entity"
}),
BrightControl.attributes.add("gaugePoint", {
    type: "entity"
}),
BrightControl.attributes.add("pitData", {
    type: "json",
    schema: [{
        name: "point",
        type: "entity"
    }, {
        name: "pos",
        type: "entity"
    }, {
        name: "pitchAngleVec2",
        type: "vec2"
    }, {
        name: "yawAngleVec2",
        type: "vec2"
    }, {
        name: "distances",
        type: "vec2"
    }, {
        name: "popup",
        type: "entity",
        array: !0,
        description: "亮度弹窗"
    }],
    array: !0,
    description: "亮度相机位置数据"
}),
BrightControl.attributes.add("initData", {
    type: "json",
    schema: [{
        name: "point",
        type: "entity"
    }, {
        name: "pitchAngleVec2",
        type: "vec2"
    }, {
        name: "distances",
        type: "vec2"
    }],
    description: "相机初始坐标数据"
}),
BrightControl.attributes.add("sceneBlackValue", {
    type: "vec2",
    description: "场景暗幕数值"
}),
BrightControl.occol = null,
BrightControl.prototype.initialize = function() {
    BrightControl.occol = this.cam.script.orbitCamera,
    this.turnCon = this.entity.script.turnControl,
    this.num = -1,
    this.num2 = -1,
    this.tweenNum = -1,
    this.tween = null,
    this.tween2 = null,
    this.tween_sceneBlack = null,
    this.sceneBlackState = !1,
    this.hostState = !0
}
,
BrightControl.prototype.changeBright = function(t) {
    if (this.hostState && this.changeHost(),
    -1 != this.num) {
        if (this.num == t)
            return;
        4 == this.num && this.turnCon.changeSelfDoor2(0, !1)
    }
    0 == t ? this.changeBasicInfo() : 1 == t ? this.changeCarHead() : 2 == t ? this.changeLight() : 3 == t ? this.changeScreen() : 4 == t && this.changeDoor(),
    this.num = t
}
,
BrightControl.prototype.changeBrightTrim = function(t) {
    -1 != this.num2 && this.num2 == t || (0 == t ? this.changeVortex() : 1 == t ? this.changeSkylight() : 2 == t ? this.changeDoubleSeat() : 3 == t && this.changeRearviewMirror(),
    this.num2 = t)
}
,
BrightControl.prototype.changeHost = function() {
    this.hostState = !this.hostState;
    for (var t = 0; t < this.hosts.length; t++)
        this.hosts[t].enabled = this.hostState
}
,
BrightControl.prototype.changeBasicInfo = function() {
    this.openTween(0, null)
}
,
BrightControl.prototype.changeCarHead = function() {
    this.openTween(1, null)
}
,
BrightControl.prototype.changeLight = function() {}
,
BrightControl.prototype.changeDoor = function() {
    var t = this;
    this.openTween(4, (function() {
        t.turnCon.changeSelfDoor2(0, !0)
    }
    ))
}
,
BrightControl.prototype.changeScreen = function() {}
,
BrightControl.prototype.openTween = function(t, i) {
    if (this.tween && this.tween.stop(),
    this.tween2 && this.tween2.stop(),
    -1 != this.tweenNum)
        for (var e = 0; e < this.pitData[this.tweenNum].popup.length; e++)
            this.pitData[this.tweenNum].popup[e].enabled = !1;
    this.tweenNum = t;
    var n = this.cam.getRotation()
      , o = this.cam.getPosition()
      , a = n.clone()
      , s = o.clone()
      , c = this.pitData[t].pos.getRotation()
      , h = this.pitData[t].pos.getPosition();
    BrightControl.occol.enabled = !1;
    var r = {
        value: 0
    }
      , l = this;
    this.tween = this.app.tween(r).to({
        value: 1
    }, 1, pc.Linear).on("update", (function() {
        n.slerp(a, c, r.value),
        o.lerp(s, h, r.value),
        l.cam.setRotation(n),
        l.cam.setPosition(o)
    }
    )).on("complete", (function() {
        console.log("closeWC"),
        l.tween = null;
        for (var e = 0; e < l.pitData[t].popup.length; e++)
            l.pitData[t].popup[e].enabled = !0;
        BrightControl.occol.focusEntity = l.pitData[t].point,
        BrightControl.occol.distanceMin = l.pitData[t].distances.x,
        BrightControl.occol.distanceMax = l.pitData[t].distances.y,
        BrightControl.occol.pitchAngleMin = l.pitData[t].pitchAngleVec2.x,
        BrightControl.occol.pitchAngleMax = l.pitData[t].pitchAngleVec2.y,
        BrightControl.occol.yawAngleClamp = l.pitData[t].yawAngleVec2,
        BrightControl.occol.isClampYaw = !0,
        BrightControl.occol.init(!0),
        BrightControl.occol.enabled = !0,
        null != i && i()
    }
    )),
    this.tween.start()
}
,
BrightControl.prototype.initTween = function(t) {
    if (this.tween && this.tween.stop(),
    this.tween2 && this.tween2.stop(),
    -1 != this.tweenNum)
        for (var i = 0; i < this.pitData[this.tweenNum].popup.length; i++)
            this.pitData[this.tweenNum].popup[i].enabled = !1;
    if (this.hostState || this.changeHost(),
    -1 != this.tweenNum) {
        4 == this.num && (this.turnCon.changeSelfDoor2(0, !1),
        this.num = -1);
        var e = this.initData.point.getPosition().clone()
          , n = this.initData.point.getPosition().clone()
          , o = this.pitData[this.tweenNum].pos.getPosition().clone()
          , a = this.pitData[this.tweenNum].point.getPosition().clone();
        BrightControl.occol.enabled = !1,
        e = new pc.Vec3((e.x + o.x) / 2,(e.y + o.y) / 2,(e.z + o.z) / 2),
        o = new pc.Vec3(2 * e.x - a.x,2 * e.y - a.y,2 * e.z - a.z),
        n.distance(o) > this.initData.distances.y && (o = (o = o.sub(n).normalize()).mulScalar(this.initData.distances.y).add(n)),
        this.gaugePoint.setPosition(o),
        this.gaugePoint.lookAt(this.initData.point.getPosition().clone());
        var s = this;
        this.tween = this.cam.tween(s.cam.getLocalPosition()).to(o, t, pc.Linear).on("complete", (function() {
            BrightControl.occol.focusEntity = s.initData.point,
            BrightControl.occol.distanceMin = s.initData.distances.x,
            BrightControl.occol.distanceMax = s.initData.distances.y,
            BrightControl.occol.pitchAngleMin = s.initData.pitchAngleVec2.x,
            BrightControl.occol.pitchAngleMax = s.initData.pitchAngleVec2.y,
            BrightControl.occol.isClampYaw = !1,
            BrightControl.occol.init(!0),
            s.tween = null,
            BrightControl.occol.enabled = !0
        }
        )).start(),
        this.tween2 = this.cam.tween(this.cam.getEulerAngles()).rotate(this.gaugePoint.getEulerAngles(), t, pc.Linear).start(),
        this.tweenNum = -1
    }
}
,
BrightControl.prototype.initTweenNow = function() {
    if (this.tween && this.tween.stop(),
    this.tween2 && this.tween2.stop(),
    -1 != this.tweenNum) {
        for (var t = 0; t < this.pitData[this.tweenNum].popup.length; t++)
            this.pitData[this.tweenNum].popup[t].enabled = !1;
        this.hostState || this.changeHost();
        var i = this.initData.point.getPosition().clone()
          , e = this.initData.point.getPosition().clone()
          , n = this.pitData[this.tweenNum].pos.getPosition().clone()
          , o = this.pitData[this.tweenNum].point.getPosition().clone();
        BrightControl.occol.enabled = !1,
        i = new pc.Vec3((i.x + n.x) / 2,(i.y + n.y) / 2,(i.z + n.z) / 2),
        n = new pc.Vec3(2 * i.x - o.x,2 * i.y - o.y,2 * i.z - o.z),
        e.distance(n) > this.initData.distances.y && (n = (n = n.sub(e).normalize()).mulScalar(this.initData.distances.y).add(e)),
        this.gaugePoint.setPosition(n),
        this.gaugePoint.lookAt(this.initData.point.getPosition().clone()),
        this.cam.setLocalPosition(n),
        this.cam.setEulerAngles(this.gaugePoint.getEulerAngles().clone()),
        BrightControl.occol.focusEntity = this.initData.point,
        BrightControl.occol.distanceMin = this.initData.distances.x,
        BrightControl.occol.distanceMax = this.initData.distances.y,
        BrightControl.occol.pitchAngleMin = this.initData.pitchAngleVec2.x,
        BrightControl.occol.pitchAngleMax = this.initData.pitchAngleVec2.y,
        BrightControl.occol.isClampYaw = !1,
        BrightControl.occol.init(!0),
        BrightControl.occol.enabled = !0,
        this.tweenNum = -1,
        this.num = -1
    }
}
,
BrightControl.prototype.sceneBlack = function(t) {
    if (this.sceneBlackState != t) {
        this.tween_sceneBlack && this.tween_sceneBlack.stop();
        var i = 0;
        i = t ? this.sceneBlackValue.x : this.sceneBlackValue.y,
        this.sceneBlackState = t;
        var e = this.app.scene
          , n = {
            value: e.exposure
        }
          , o = this;
        this.tween_sceneBlack = this.app.tween(n).to({
            value: i
        }, 1, pc.Linear).on("update", (function() {
            e.exposure = n.value
        }
        )).on("complete", (function() {
            console.log("sceneBlack over"),
            o.tween_sceneBlack = null
        }
        )),
        this.tween_sceneBlack.start()
    }
}
,
BrightControl.prototype.changeVortex = function() {}
,
BrightControl.prototype.changeSkylight = function() {}
,
BrightControl.prototype.changeDoubleSeat = function() {}
,
BrightControl.prototype.changeRearviewMirror = function() {}
;
var Hotspot = pc.createScript("hotspot");
Hotspot.attributes.add("cameraEntity", {
    type: "entity",
    title: "Camera Entity"
}),
Hotspot.attributes.add("radius", {
    type: "number",
    title: "Radius"
}),
Hotspot.attributes.add("fadeDropOff", {
    type: "number",
    default: .4,
    title: "Fade Drop Off",
    description: "When to start fading out hotspot relative to the camera direction. 1 for when hotspot is directly inline with the camera. 0 for never."
}),
Hotspot.attributes.add("isHide", {
    type: "boolean",
    default: !1
}),
Hotspot.attributes.add("hostAnim", {
    type: "json",
    schema: [{
        name: "pos",
        type: "vec2"
    }, {
        name: "models",
        type: "entity",
        array: !0
    }]
}),
Hotspot.prototype.initialize = function() {
    this.hitArea = new pc.BoundingSphere(this.entity.getPosition(),this.radius),
    this.ray = new pc.Ray,
    this.time = this.hostAnim.pos.y,
    this.dir = -1,
    this.defaultForwardDirection = this.entity.forward.clone(),
    this.directionToCamera = new pc.Vec3,
    this.sprite = this.entity.children[0],
    this.sprite1 = this.hostAnim.models,
    this.meshInstances = [];
    for (var t = 0; t < this.sprite1.length; t++)
        for (var i = this.sprite1[t].findComponents("render"), e = 0; e < i.length; ++e)
            for (var s = i[e].meshInstances, o = 0; o < s.length; o++)
                this.meshInstances.push(s[o]);
    this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this),
    this.app.touch && this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this),
    this.on("destroy", (function() {
        this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this),
        this.app.touch && this.app.touch.off(pc.EVENT_TOUCHSTART, this.onTouchStart, this)
    }
    ))
}
,
Hotspot.prototype.update = function(t) {
    var i = this.cameraEntity.getPosition();
    (this.entity.lookAt(i),
    this.directionToCamera.sub2(i, this.entity.getPosition()),
    this.directionToCamera.normalize(),
    this.anim(t),
    this.isHide) || (this.directionToCamera.dot(this.defaultForwardDirection) < 0 ? this.sprite.enabled && (this.sprite.enabled = !1) : this.sprite.enabled || (this.sprite.enabled = !0))
}
,
Hotspot.prototype.initArea = function(t) {
    this.hitArea = new pc.BoundingSphere(this.entity.getPosition(),t)
}
,
Hotspot.prototype.doRayCast = function(t) {
    this.sprite.enabled && (this.cameraEntity.camera.screenToWorld(t.x, t.y, this.cameraEntity.camera.farClip, this.ray.direction),
    this.ray.origin.copy(this.cameraEntity.getPosition()),
    this.ray.direction.sub(this.ray.origin).normalize(),
    this.hitArea.intersectsRay(this.ray) && this.entity.fire("pulse:start"))
}
,
Hotspot.prototype.onMouseDown = function(t) {
    t.button == pc.MOUSEBUTTON_LEFT && this.doRayCast(t)
}
,
Hotspot.prototype.onTouchStart = function(t) {
    1 == t.touches.length && (this.doRayCast(t.touches[0]),
    t.event.preventDefault())
}
,
Hotspot.prototype.onEnter = function(t) {
    console.log("enter")
}
,
Hotspot.prototype.anim = function(t) {
    this.time += t * this.dir * .5,
    this.time >= this.hostAnim.pos.y ? this.dir = -1 : this.time <= this.hostAnim.pos.x && (this.dir = 1);
    for (var i = 0; i < this.meshInstances.length; ++i)
        this.meshInstances[i].setParameter("material_opacity", this.time)
}
;
var CameraChange = pc.createScript("cameraChange");
CameraChange.attributes.add("camera", {
    type: "entity"
}),
CameraChange.attributes.add("pos", {
    type: "entity",
    array: !0
}),
CameraChange.attributes.add("host", {
    type: "entity"
}),
CameraChange.attributes.add("sceneBlackValue", {
    type: "vec2"
}),
CameraChange.attributes.add("hosts", {
    type: "entity",
    array: !0
}),
CameraChange.attributes.add("animData", {
    type: "json",
    schema: [{
        name: "initPos",
        type: "entity"
    }, {
        name: "traget",
        type: "entity"
    }, {
        name: "dis",
        type: "vec2"
    }],
    array: !0
}),
CameraChange.prototype.initialize = function() {
    this.turnCon = this.entity.script.turnControl,
    this.orcm = this.camera.script.orbitCamera;
    var t = pc.Application.getApplication().graphicsDevice;
    window.devicePixelRatio > 4 ? t.maxPixelRatio = 4 : t.maxPixelRatio = window.devicePixelRatio,
    this.tween_sceneBlack = null,
    this.tweenMove = null,
    this.tweenRotate = null,
    this.posNum = 0,
    this.nwState = 0,
    this.camera.script.orbitCamera.enabled = !1,
    this.exteriorAnim(!1),
    this.hostAction = null
}
,
CameraChange.prototype.changeView = function(t) {
    var e = this.pos[0].getPosition()
      , a = this.pos[0].getLocalEulerAngles();
    0 == t ? (this.camera.script.orbitCamera.getMoveValue = !0,
    this.camera.script.selfRotateCamera.getMoveValue = !1,
    this.exteriorAnim(!1),
    this.camera.script.selfRotateCamera.enabled = !1,
    this.camera.camera.nearClip = .1,
    this.camera.camera.fov = 45,
    this.host.enabled = !1) : 1 == t && (this.camera.script.orbitCamera.enabled = !1,
    this.camera.script.orbitCamera.getMoveValue = !1,
    this.camera.setPosition(e.x, e.y, e.z),
    this.camera.setLocalEulerAngles(a.x, a.y, a.z),
    this.camera.script.selfRotateCamera.getMoveValue = !0,
    this.hosts[this.posNum].enabled = !0,
    this.posNum = 0,
    this.hosts[this.posNum].enabled = !1,
    this.trimAnim(),
    this.camera.camera.nearClip = .01,
    this.camera.camera.fov = 75,
    this.host.enabled = !0,
    this.turnCon.trunInit()),
    this.nwState = t
}
,
CameraChange.prototype.changeSelfPos = function(t) {
    if (1 == this.nwState && !(t >= this.pos.length) && this.posNum != t) {
        window.top.postMessage(t + "", "*"),
        this.hosts[t].enabled = !1;
        var e = this;
        this.hostAction = function() {
            e.hosts[e.posNum].enabled = !0,
            e.posNum = t
        }
        ,
        this.initTween(t + 6, 1)
    }
}
,
CameraChange.prototype.exteriorAnim = function(t) {
    t && this.sceneBlack(),
    this.initTween(0, 1.5)
}
,
CameraChange.prototype.trimAnim = function() {
    this.initTween(1, 1)
}
,
CameraChange.prototype.carRunAnim = function() {
    this.sceneBlack(),
    this.initTween(2, 1.5)
}
,
CameraChange.prototype.initTween = function(t, e) {
    if (this.tweenMove && (this.tweenMove.stop(),
    null != this.hostAction && (this.hostAction(),
    this.hostAction = null)),
    this.tweenRotate && this.tweenRotate.stop(),
    1 == t || 6 == t || 7 == t || 8 == t ? this.camera.script.selfRotateCamera.enabled = !1 : this.camera.script.orbitCamera.enabled = !1,
    this.animData[t].initPos) {
        var a = this.animData[t].initPos.getPosition()
          , i = this.animData[t].initPos.getEulerAngles();
        this.camera.setPosition(a),
        this.camera.setLocalEulerAngles(i)
    }
    var n = this.animData[t].traget.getPosition()
      , s = this.animData[t].traget.getEulerAngles()
      , o = new pc.Vec2(s.x,s.y)
      , r = this;
    this.tweenMove = this.camera.tween(this.camera.getLocalPosition()).to(n, e, pc.CubicInOut).on("complete", (function() {
        1 == t || 6 == t || 7 == t || 8 == t ? (r.camera.script.selfRotateCamera.Init(o),
        r.camera.script.selfRotateCamera.enabled = !0,
        null != r.hostAction && (r.hostAction(),
        r.hostAction = null)) : (r.camera.script.orbitCamera.distanceMin = r.animData[t].dis.x,
        r.camera.script.orbitCamera.distanceMax = r.animData[t].dis.y,
        r.camera.script.orbitCamera.init(!0),
        r.camera.script.orbitCamera.enabled = !0),
        r.tweenMove = null
    }
    )),
    this.tweenMove.start(),
    this.tweenRotate = this.camera.tween(this.camera.getEulerAngles()).rotate(s, e, pc.CubicInOut).on("complete", (function() {
        r.tweenRotate = null
    }
    )),
    this.tweenRotate.start()
}
,
CameraChange.prototype.hubAnim = function() {
    this.diffMove(this.animData[3].traget.getEulerAngles())
}
,
CameraChange.prototype.calliperAnim = function() {
    this.diffMove(this.animData[4].traget.getEulerAngles())
}
,
CameraChange.prototype.kitAnim = function() {
    this.diffMove(this.animData[5].traget.getEulerAngles())
}
,
CameraChange.prototype.diffMove = function(t) {
    this.orcm.initXY(),
    this.orcm.yaw - t.x > 180 ? (this.orcm.yaw -= 360,
    this.orcm._yaw -= 360) : this.orcm.yaw - t.x < -180 && (this.orcm.yaw += 360,
    this.orcm._yaw += 360),
    this.orcm.yaw = t.x,
    this.orcm.pitch = t.y
}
,
CameraChange.prototype.sceneBlack = function() {
    this.tween_sceneBlack && this.tween_sceneBlack.stop();
    var t = this
      , e = this.app.scene;
    e.exposure = this.sceneBlackValue.x;
    var a = {
        value: e.exposure
    };
    this.tween_sceneBlack = this.app.tween(a).to({
        value: this.sceneBlackValue.y
    }, 1, pc.QuinticIn).on("update", (function() {
        e.exposure = a.value
    }
    )).on("complete", (function() {
        console.log("sceneBlack over"),
        t.tween_sceneBlack = null
    }
    )),
    this.tween_sceneBlack.start()
}
;
var CarTypeControl = pc.createScript("carTypeControl");
CarTypeControl.attributes.add("models", {
    type: "entity",
    array: !0
}),
CarTypeControl.attributes.add("logo", {
    type: "entity",
    array: !0
}),
CarTypeControl.attributes.add("sounds", {
    type: "entity",
    array: !0
}),
CarTypeControl.attributes.add("modelColor", {
    type: "json",
    schema: [{
        name: "models",
        type: "entity",
        array: !0
    }, {
        name: "mats",
        type: "asset",
        assetType: "material",
        array: !0
    }],
    array: !0
}),
CarTypeControl.prototype.initialize = function() {
    this.num = -1
}
,
CarTypeControl.prototype.changeCarType = function(e) {
    if (!(this.models.length <= 0)) {
        if (-1 != this.num) {
            if (this.num == e)
                return;
            this.models[this.num].enabled = !1
        }
        this.models[e].enabled = !0,
        this.num = e
    }
}
,
CarTypeControl.prototype.changelogo = function(e) {
    if (0 == e || 1 == e) {
        this.logo[0].enabled = !0,
        this.logo[1].enabled = !1;
        for (var o = 0; o < this.sounds.length; o++)
            this.sounds[o].enabled = !1;
        this.modelColor[0].models[0].model.meshInstances[4].material = this.modelColor[0].mats[0].resource,
        this.modelColor[0].models[0].model.meshInstances[6].material = this.modelColor[0].mats[0].resource,
        this.modelColor[0].models[1].model.meshInstances[3].material = this.modelColor[0].mats[0].resource,
        this.modelColor[0].models[2].model.meshInstances[2].material = this.modelColor[0].mats[0].resource,
        this.modelColor[0].models[3].model.meshInstances[2].material = this.modelColor[0].mats[0].resource,
        this.modelColor[0].models[4].model.meshInstances[3].material = this.modelColor[0].mats[0].resource,
        this.modelColor[1].models[0].model.meshInstances[5].material = this.modelColor[1].mats[0].resource,
        this.modelColor[1].models[1].render.meshInstances[0].material = this.modelColor[1].mats[0].resource,
        this.modelColor[2].models[0].render.meshInstances[0].material = this.modelColor[2].mats[0].resource,
        this.modelColor[3].models[0].model.meshInstances[0].material = this.modelColor[3].mats[0].resource,
        this.modelColor[3].models[1].model.meshInstances[0].material = this.modelColor[3].mats[0].resource,
        this.modelColor[4].models[0].model.meshInstances[0].material = this.modelColor[4].mats[0].resource,
        this.modelColor[4].models[1].model.meshInstances[0].material = this.modelColor[4].mats[0].resource
    } else if (2 == e) {
        this.logo[0].enabled = !1,
        this.logo[1].enabled = !0;
        for (var s = 0; s < this.sounds.length; s++)
            this.sounds[s].enabled = !0;
        this.modelColor[0].models[0].model.meshInstances[4].material = this.modelColor[0].mats[1].resource,
        this.modelColor[0].models[0].model.meshInstances[6].material = this.modelColor[0].mats[1].resource,
        this.modelColor[0].models[1].model.meshInstances[3].material = this.modelColor[0].mats[1].resource,
        this.modelColor[0].models[2].model.meshInstances[2].material = this.modelColor[0].mats[1].resource,
        this.modelColor[0].models[3].model.meshInstances[2].material = this.modelColor[0].mats[1].resource,
        this.modelColor[0].models[4].model.meshInstances[3].material = this.modelColor[0].mats[1].resource,
        this.modelColor[1].models[0].model.meshInstances[5].material = this.modelColor[1].mats[1].resource,
        this.modelColor[1].models[1].render.meshInstances[0].material = this.modelColor[1].mats[1].resource,
        this.modelColor[2].models[0].render.meshInstances[0].material = this.modelColor[2].mats[1].resource,
        this.modelColor[3].models[0].model.meshInstances[0].material = this.modelColor[3].mats[1].resource,
        this.modelColor[3].models[1].model.meshInstances[0].material = this.modelColor[3].mats[1].resource,
        this.modelColor[4].models[0].model.meshInstances[0].material = this.modelColor[4].mats[1].resource,
        this.modelColor[4].models[1].model.meshInstances[0].material = this.modelColor[4].mats[1].resource
    }
}
;
var Pulse = pc.createScript("pulse");
Pulse.attributes.add("pulseTimeSecs", {
    type: "number",
    default: 2,
    title: "Pulse Time Secs"
}),
Pulse.attributes.add("data", {
    type: "json",
    schema: [{
        name: "name",
        type: "string"
    }, {
        name: "num",
        type: "number",
        default: 0
    }]
}),
Pulse.prototype.initialize = function() {
    this.secsSinceStart = this.pulseTimeSecs + 1,
    this.entity.on("pulse:start", this.onStartEvent, this),
    this.isopen = !1
}
,
Pulse.prototype.update = function(t) {
    if (this.secsSinceStart += t,
    this.secsSinceStart <= this.pulseTimeSecs) {
        var e = this.secsSinceStart / this.pulseTimeSecs
          , s = .3 * (2 * Math.abs(e - .5)) + .7
          , i = this.entity.getLocalScale();
        i.set(s, s, s),
        this.entity.setLocalScale(i)
    }
}
,
Pulse.prototype.onStartEvent = function() {
    console.log("点击热点"),
    this.app.fire("turn:Chick", this.data)
}
;
var TweenUi = pc.createScript("tweenUi");
TweenUi.attributes.add("target", {
    type: "entity"
}),
TweenUi.prototype.initialize = function() {
    var t, e = new dat.GUI;
    if (this.target.script.tweenPosition)
        t = this.target.script.tweenPosition;
    else if (this.target.script.tweenScale)
        t = this.target.script.tweenScale;
    else if (this.target.script.tweenRotate)
        t = this.target.script.tweenRotate;
    else if (this.target.script.tweenMaterial) {
        t = this.target.script.tweenMaterial;
        var i = new pc.Color
          , n = new pc.Color
          , a = {
            from: [255 * t.fromDiffuse.r, 255 * t.fromDiffuse.g, 255 * t.fromDiffuse.b],
            to: [255 * t.toDiffuse.r, 255 * t.toDiffuse.g, 255 * t.toDiffuse.b]
        };
        e.addColor(a, "from").onChange((function(e) {
            i.set(e[0] / 255, e[1] / 255, e[2] / 255),
            t.fromDiffuse = i
        }
        )),
        e.addColor(a, "to").onChange((function(e) {
            n.set(e[0] / 255, e[1] / 255, e[2] / 255),
            t.toDiffuse = n
        }
        ))
    }
    e.add(t, "speed", .1, 5),
    e.add(t, "easing", ["Linear", "QuadraticIn", "QuadraticOut", "QuadraticInOut", "CubicIn", "CubicOut", "CubicInOut", "QuarticIn", "QuarticOut", "QuarticInOut", "QuinticIn", "QuinticOut", "QuinticInOut", "SineIn", "SineOut", "SineInOut", "ExponentialIn", "ExponentialOut", "ExponentialInOut", "CircularIn", "CircularOut", "CircularInOut", "BackIn", "BackOut", "BackInOut", "BounceIn", "BounceOut", "BounceInOut", "ElasticIn", "ElasticOut", "ElasticInOut"])
}
;
pc.extend(pc, function() {
    var TweenManager = function(t) {
        this._app = t,
        this._tweens = [],
        this._add = []
    };
    TweenManager.prototype = {
        add: function(t) {
            return this._add.push(t),
            t
        },
        update: function(t) {
            for (var i = 0, e = this._tweens.length; i < e; )
                this._tweens[i].update(t) ? i++ : (this._tweens.splice(i, 1),
                e--);
            this._add.length && (this._tweens = this._tweens.concat(this._add),
            this._add.length = 0)
        }
    };
    var Tween = function(t, i, e) {
        pc.events.attach(this),
        this.manager = i,
        e && (this.entity = null),
        this.time = 0,
        this.complete = !1,
        this.playing = !1,
        this.stopped = !0,
        this.pending = !1,
        this.target = t,
        this.duration = 0,
        this._currentDelay = 0,
        this.timeScale = 1,
        this._reverse = !1,
        this._delay = 0,
        this._yoyo = !1,
        this._count = 0,
        this._numRepeats = 0,
        this._repeatDelay = 0,
        this._from = !1,
        this._slerp = !1,
        this._fromQuat = new pc.Quat,
        this._toQuat = new pc.Quat,
        this._quat = new pc.Quat,
        this.easing = pc.Linear,
        this._sv = {},
        this._ev = {}
    }
      , _parseProperties = function(t) {
        var i;
        return t instanceof pc.Vec2 ? i = {
            x: t.x,
            y: t.y
        } : t instanceof pc.Vec3 ? i = {
            x: t.x,
            y: t.y,
            z: t.z
        } : t instanceof pc.Vec4 || t instanceof pc.Quat ? i = {
            x: t.x,
            y: t.y,
            z: t.z,
            w: t.w
        } : t instanceof pc.Color ? (i = {
            r: t.r,
            g: t.g,
            b: t.b
        },
        void 0 !== t.a && (i.a = t.a)) : i = t,
        i
    };
    Tween.prototype = {
        to: function(t, i, e, n, s, r) {
            return this._properties = _parseProperties(t),
            this.duration = i,
            e && (this.easing = e),
            n && this.delay(n),
            s && this.repeat(s),
            r && this.yoyo(r),
            this
        },
        from: function(t, i, e, n, s, r) {
            return this._properties = _parseProperties(t),
            this.duration = i,
            e && (this.easing = e),
            n && this.delay(n),
            s && this.repeat(s),
            r && this.yoyo(r),
            this._from = !0,
            this
        },
        rotate: function(t, i, e, n, s, r) {
            return this._properties = _parseProperties(t),
            this.duration = i,
            e && (this.easing = e),
            n && this.delay(n),
            s && this.repeat(s),
            r && this.yoyo(r),
            this._slerp = !0,
            this
        },
        start: function() {
            var t, i, e, n;
            if (this.playing = !0,
            this.complete = !1,
            this.stopped = !1,
            this._count = 0,
            this.pending = this._delay > 0,
            this._reverse && !this.pending ? this.time = this.duration : this.time = 0,
            this._from) {
                for (t in this._properties)
                    this._properties.hasOwnProperty(t) && (this._sv[t] = this._properties[t],
                    this._ev[t] = this.target[t]);
                this._slerp && (this._toQuat.setFromEulerAngles(this.target.x, this.target.y, this.target.z),
                i = void 0 !== this._properties.x ? this._properties.x : this.target.x,
                e = void 0 !== this._properties.y ? this._properties.y : this.target.y,
                n = void 0 !== this._properties.z ? this._properties.z : this.target.z,
                this._fromQuat.setFromEulerAngles(i, e, n))
            } else {
                for (t in this._properties)
                    this._properties.hasOwnProperty(t) && (this._sv[t] = this.target[t],
                    this._ev[t] = this._properties[t]);
                this._slerp && (this._fromQuat.setFromEulerAngles(this.target.x, this.target.y, this.target.z),
                i = void 0 !== this._properties.x ? this._properties.x : this.target.x,
                e = void 0 !== this._properties.y ? this._properties.y : this.target.y,
                n = void 0 !== this._properties.z ? this._properties.z : this.target.z,
                this._toQuat.setFromEulerAngles(i, e, n))
            }
            return this._currentDelay = this._delay,
            this.manager.add(this),
            this
        },
        pause: function() {
            this.playing = !1
        },
        resume: function() {
            this.playing = !0
        },
        stop: function() {
            this.playing = !1,
            this.stopped = !0
        },
        delay: function(t) {
            return this._delay = t,
            this.pending = !0,
            this
        },
        repeat: function(t, i) {
            return this._count = 0,
            this._numRepeats = t,
            this._repeatDelay = i || 0,
            this
        },
        loop: function(t) {
            return t ? (this._count = 0,
            this._numRepeats = 1 / 0) : this._numRepeats = 0,
            this
        },
        yoyo: function(t) {
            return this._yoyo = t,
            this
        },
        reverse: function() {
            return this._reverse = !this._reverse,
            this
        },
        chain: function() {
            for (var t = arguments.length; t--; )
                t > 0 ? arguments[t - 1]._chained = arguments[t] : this._chained = arguments[t];
            return this
        },
        update: function(t) {
            if (this.stopped)
                return !1;
            if (!this.playing)
                return !0;
            if (!this._reverse || this.pending ? this.time += t * this.timeScale : this.time -= t * this.timeScale,
            this.pending) {
                if (!(this.time > this._currentDelay))
                    return !0;
                this._reverse ? this.time = this.duration - (this.time - this._currentDelay) : this.time = this.time - this._currentDelay,
                this.pending = !1
            }
            var i = 0;
            (!this._reverse && this.time > this.duration || this._reverse && this.time < 0) && (this._count++,
            this.complete = !0,
            this.playing = !1,
            this._reverse ? (i = this.duration - this.time,
            this.time = 0) : (i = this.time - this.duration,
            this.time = this.duration));
            var e, n, s = 0 === this.duration ? 1 : this.time / this.duration, r = this.easing(s);
            for (var h in this._properties)
                this._properties.hasOwnProperty(h) && (e = this._sv[h],
                n = this._ev[h],
                this.target[h] = e + (n - e) * r);
            if (this._slerp && this._quat.slerp(this._fromQuat, this._toQuat, r),
            this.entity && (this.entity._dirtifyLocal(),
            this.element && this.entity.element && (this.entity.element[this.element] = this.target),
            this._slerp && this.entity.setLocalRotation(this._quat)),
            this.fire("update", t),
            this.complete) {
                var a = this._repeat(i);
                return a ? this.fire("loop") : (this.fire("complete", i),
                this.entity && this.entity.off("destroy", this.stop, this),
                this._chained && this._chained.start()),
                a
            }
            return !0
        },
        _repeat: function(t) {
            if (this._count < this._numRepeats) {
                if (this._reverse ? this.time = this.duration - t : this.time = t,
                this.complete = !1,
                this.playing = !0,
                this._currentDelay = this._repeatDelay,
                this.pending = !0,
                this._yoyo) {
                    for (var i in this._properties) {
                        var e = this._sv[i];
                        this._sv[i] = this._ev[i],
                        this._ev[i] = e
                    }
                    this._slerp && (this._quat.copy(this._fromQuat),
                    this._fromQuat.copy(this._toQuat),
                    this._toQuat.copy(this._quat))
                }
                return !0
            }
            return !1
        }
    };
    var BounceIn = function(t) {
        return 1 - BounceOut(1 - t)
    }
      , BounceOut = function(t) {
        return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
    };
    return {
        TweenManager: TweenManager,
        Tween: Tween,
        Linear: function(t) {
            return t
        },
        QuadraticIn: function(t) {
            return t * t
        },
        QuadraticOut: function(t) {
            return t * (2 - t)
        },
        QuadraticInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
        },
        CubicIn: function(t) {
            return t * t * t
        },
        CubicOut: function(t) {
            return --t * t * t + 1
        },
        CubicInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
        },
        QuarticIn: function(t) {
            return t * t * t * t
        },
        QuarticOut: function(t) {
            return 1 - --t * t * t * t
        },
        QuarticInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
        },
        QuinticIn: function(t) {
            return t * t * t * t * t
        },
        QuinticOut: function(t) {
            return --t * t * t * t * t + 1
        },
        QuinticInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
        },
        SineIn: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : 1 - Math.cos(t * Math.PI / 2)
        },
        SineOut: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : Math.sin(t * Math.PI / 2)
        },
        SineInOut: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : .5 * (1 - Math.cos(Math.PI * t))
        },
        ExponentialIn: function(t) {
            return 0 === t ? 0 : Math.pow(1024, t - 1)
        },
        ExponentialOut: function(t) {
            return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
        },
        ExponentialInOut: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
        },
        CircularIn: function(t) {
            return 1 - Math.sqrt(1 - t * t)
        },
        CircularOut: function(t) {
            return Math.sqrt(1 - --t * t)
        },
        CircularInOut: function(t) {
            return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        },
        BackIn: function(t) {
            var i = 1.70158;
            return t * t * ((i + 1) * t - i)
        },
        BackOut: function(t) {
            var i = 1.70158;
            return --t * t * ((i + 1) * t + i) + 1
        },
        BackInOut: function(t) {
            var i = 2.5949095;
            return (t *= 2) < 1 ? t * t * ((i + 1) * t - i) * .5 : .5 * ((t -= 2) * t * ((i + 1) * t + i) + 2)
        },
        BounceIn: BounceIn,
        BounceOut: BounceOut,
        BounceInOut: function(t) {
            return t < .5 ? .5 * BounceIn(2 * t) : .5 * BounceOut(2 * t - 1) + .5
        },
        ElasticIn: function(t) {
            var i, e = .1;
            return 0 === t ? 0 : 1 === t ? 1 : (!e || e < 1 ? (e = 1,
            i = .1) : i = .4 * Math.asin(1 / e) / (2 * Math.PI),
            -e * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - i) * (2 * Math.PI) / .4))
        },
        ElasticOut: function(t) {
            var i, e = .1;
            return 0 === t ? 0 : 1 === t ? 1 : (!e || e < 1 ? (e = 1,
            i = .1) : i = .4 * Math.asin(1 / e) / (2 * Math.PI),
            e * Math.pow(2, -10 * t) * Math.sin((t - i) * (2 * Math.PI) / .4) + 1)
        },
        ElasticInOut: function(t) {
            var i, e = .1, n = .4;
            return 0 === t ? 0 : 1 === t ? 1 : (!e || e < 1 ? (e = 1,
            i = .1) : i = n * Math.asin(1 / e) / (2 * Math.PI),
            (t *= 2) < 1 ? e * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - i) * (2 * Math.PI) / n) * -.5 : e * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - i) * (2 * Math.PI) / n) * .5 + 1)
        }
    }
}()),
function() {
    pc.Application.prototype.addTweenManager = function() {
        this._tweenManager = new pc.TweenManager(this),
        this.on("update", (function(t) {
            this._tweenManager.update(t)
        }
        ))
    }
    ,
    pc.Application.prototype.tween = function(t) {
        return new pc.Tween(t,this._tweenManager)
    }
    ,
    pc.Entity.prototype.tween = function(t, i) {
        var e = this._app.tween(t);
        return e.entity = this,
        this.once("destroy", e.stop, e),
        i && i.element && (e.element = i.element),
        e
    }
    ;
    var t = pc.Application.getApplication();
    t && t.addTweenManager()
}();
var PortControl = pc.createScript("portControl");
PortControl.attributes.add("script", {
    type: "entity"
}),
PortControl.prototype.initialize = function() {
    this.carColor = this.script.script.carColorControl,
    this.cameraChange = this.script.script.cameraChange,
    this.callipersCon = this.script.script.callipersControl,
    this.carTypeCon = this.script.script.carTypeControl,
    this.hubCon = this.script.script.hubControl,
    this.turnCon = this.script.script.turnControl,
    this.otherCon = this.script.script.otherControl,
    this.trimCon = this.script.script.trimControl,
    this.blightCon = this.script.script.brightControl,
    this.toolsMenuCon = this.script.script.toolsMenuControl,
    this.carMoveCon = this.script.script.carMoveControl,
    this.carType = 0,
    this.protNum = 0,
    this.buttonNum = 0,
    this.state = 0;
    var t = this;
    this.app.on("score:changeCarColor", (function(o) {
        t.changeCarColor(o)
    }
    ), this),
    this.app.on("score:changeCarHub", (function(o) {
        t.changeCarHub(o)
    }
    ), this),
    this.app.on("score:changeState", (function(o, n) {
        t.changeState(o, n)
    }
    ), this),
    this.app.on("score:changeView", (function(o) {
        t.changeView(o)
    }
    ), this),
    this.app.on("score:changeTurn", (function(o) {
        t.changeTurn(o)
    }
    ), this),
    this.app.on("score:changeCarType", (function(o) {
        t.changeCarType(o)
    }
    ), this),
    this.app.on("score:changeCallipers", (function(o) {
        t.changeCallipers(o)
    }
    ), this),
    this.app.on("score:changeTrim", (function(o) {
        t.changeTrim(o)
    }
    ), this),
    this.app.on("score:changeSeat", (function(o) {
        t.changeSeat(o)
    }
    ), this),
    this.app.on("score:changePart", (function(o) {
        t.changePart(o)
    }
    ), this),
    this.app.on("score:changeBlight", (function(o) {
        t.changeBlight(o)
    }
    ), this),
    this.app.on("score:changeBrightTrim", (function(o) {
        t.changeBrightTrim(o)
    }
    ), this),
    this.app.on("score:changeToolMenu", (function(o) {
        t.changeToolMenu(o)
    }
    ), this),
    this.app.on("score:changeCarMove", (function(o) {
        t.changeCarMove(o)
    }
    ), this),
    this.app.on("score:changeButton", (function(o) {
        t.changeButton(o)
    }
    ), this),
    this.changeCarColor(7)
}
,
PortControl.prototype.changeCarColor = function(t) {
    this.carColor.changeColor(t)
}
,
PortControl.prototype.changeCarHub = function(t) {
    this.hubCon.changeHub(t)
}
,
PortControl.prototype.changeState = function(t) {
    this.state != t && (0 == t ? (this.cameraChange.changeView(0),
    this.state = 0) : 1 == t && (this.blightCon.initTweenNow(),
    this.hubCon.changeCarHubRun(!1),
    this.carMoveCon.changeCarRunScene(!1),
    this.cameraChange.changeView(1),
    this.state = 1,
    this.buttonNum = 0))
}
,
PortControl.prototype.changeView = function(t) {
    this.cameraChange.changeSelfPos(t)
}
,
PortControl.prototype.changeTurn = function(t) {
    this.turnCon.changeTurn(t)
}
,
PortControl.prototype.changeCarType = function(t) {
    this.carTypeCon.changeCarType(t),
    this.carTypeCon.changelogo(t),
    0 == t ? (this.carType = 0,
    this.changeCarColor(7),
    this.changeCarHub(0),
    this.changeCallipers(0),
    this.otherCon.changeEmpennage(1),
    this.changePart(0),
    this.changeTrim(2),
    this.changeSeat(0)) : (this.carType = 2,
    this.changeCarColor(9),
    this.changeCarHub(2),
    this.changeCallipers(2),
    this.otherCon.changeEmpennage(1),
    this.changePart(0),
    this.changeTrim(0),
    this.changeSeat(1))
}
,
PortControl.prototype.changeCallipers = function(t) {
    this.callipersCon.changeCallipers(t)
}
,
PortControl.prototype.changeTrim = function(t) {
    console.log("内饰：" + t),
    this.trimCon.changeTrimColor(t)
}
,
PortControl.prototype.changeSeat = function(t) {
    console.log("座椅：" + t),
    this.trimCon.changeSeat(t)
}
,
PortControl.prototype.changePart = function(t) {
    2 == t && (t = 1),
    2 == t ? this.otherCon.setPart(1) : this.otherCon.setPart(t),
    this.otherCon.openLogo(this.protNum, !1),
    2 == this.carType && (this.otherCon.openLogo(t, !0),
    this.otherCon.controlLogo(!1)),
    this.protNum = t
}
,
PortControl.prototype.changeBlight = function(t) {
    this.blightCon.changeBright(t)
}
,
PortControl.prototype.changeBrightTrim = function(t) {
    console.log("内饰产品亮点：" + t)
}
,
PortControl.prototype.changeToolMenu = function(t) {
    this.toolsMenuCon.changeToolMenu(t)
}
,
PortControl.prototype.changeCarMove = function(t) {
    console.log("行驶状态功能点：" + t)
}
,
PortControl.prototype.changeButton = function(t) {
    5 == t && 5 != this.buttonNum || 5 == this.buttonNum && this.blightCon.initTween(1),
    2 == t && 2 != this.buttonNum ? this.cameraChange.hubAnim() : 3 == t && 3 != this.buttonNum ? this.cameraChange.calliperAnim() : 4 == t && 4 != this.buttonNum && this.cameraChange.kitAnim(),
    6 == t && 6 != this.buttonNum ? (this.cameraChange.carRunAnim(),
    this.carMoveCon.changeCarRunScene(!0),
    this.hubCon.changeCarHubRun(!0)) : 6 == this.buttonNum && (this.hubCon.changeCarHubRun(!1),
    this.carMoveCon.changeCarRunScene(!1),
    2 == t || 3 == t || 4 == t ? this.cameraChange.sceneBlack() : this.cameraChange.exteriorAnim(!0)),
    this.buttonNum == t ? this.buttonNum = 0 : this.buttonNum = t
}
;
var ToolsMenuControl = pc.createScript("toolsMenuControl");
ToolsMenuControl.attributes.add("hosts", {
    type: "entity",
    array: !0
}),
ToolsMenuControl.attributes.add("selfHosts", {
    type: "entity",
    array: !0
}),
ToolsMenuControl.attributes.add("sound", {
    type: "entity"
}),
ToolsMenuControl.prototype.initialize = function() {
    this.hostState = !0,
    this.soundState = !1,
    this.turnCon = this.entity.script.turnControl;
    var t = this;
    setTimeout((()=>{
        navigator.userAgent.match(/iPad/i) ? console.log("ipad") : navigator.userAgent.match(/(iPhone|mobile|Android|Windows Phone|SymbianOS)/i) && (console.log("middle"),
        t.selfHostScope())
    }
    ), 1e3)
}
,
ToolsMenuControl.prototype.changeToolMenu = function(t) {
    0 == t ? this.reset() : 1 == t ? this.controlSound() : 2 == t ? this.changeHost() : 3 == t ? this.changeScene(0) : 4 == t ? this.changeScene(1) : 5 == t ? this.changeScene(2) : 6 == t && this.changeScene(3)
}
,
ToolsMenuControl.prototype.changeHost = function() {
    this.hostState = !this.hostState;
    for (var t = 0; t < this.hosts.length; t++)
        this.hosts[t].enabled = this.hostState
}
,
ToolsMenuControl.prototype.reset = function() {
    this.turnCon.trunInit()
}
,
ToolsMenuControl.prototype.controlSound = function() {
    this.soundState = !this.soundState,
    this.soundState ? this.sound.sound.play("bg") : this.sound.sound.stop("bg")
}
,
ToolsMenuControl.prototype.selfHostScope = function() {
    for (var t = 0; t < this.selfHosts.length; t++)
        this.selfHosts[t].script.hotspot.initArea(.15)
}
,
ToolsMenuControl.prototype.changeScene = function(t) {
    console.log("场景切换：" + t)
}
;
var CarMoveControl = pc.createScript("carMoveControl");
CarMoveControl.attributes.add("scenes", {
    type: "entity",
    array: !0
}),
CarMoveControl.prototype.initialize = function() {}
,
CarMoveControl.prototype.changeCarMoveBlight = function(e) {}
,
CarMoveControl.prototype.changeCarRunScene = function(e) {
    this.scenes[0].enabled = !e,
    this.scenes[1].enabled = e
}
;
var Warp1 = pc.createScript("warp1");
Warp1.attributes.add("mats", {
    type: "asset",
    assetType: "material",
    array: !0
}),
Warp1.attributes.add("speed", {
    type: "number",
    default: 1
}),
Warp1.attributes.add("fx", {
    type: "number",
    title: "uv移动方向",
    enum: [{
        "往左移动": 1
    }, {
        "往右移动": 2
    }, {
        "往上移动": 3
    }, {
        "往下移动": 4
    }],
    default: 1
}),
Warp1.attributes.add("diffuse", {
    type: "boolean",
    default: !1
}),
Warp1.attributes.add("opacity", {
    type: "boolean",
    default: !1
}),
Warp1.attributes.add("emissive", {
    type: "boolean",
    default: !1
}),
Warp1.attributes.add("isPlay", {
    type: "boolean",
    default: !0
}),
Warp1.prototype.initialize = function() {
    this.time = 0
}
,
Warp1.prototype.update = function(t) {
    if (this.isPlay) {
        switch (this.time += t * this.speed,
        this.fx) {
        case 1:
            this.v = new pc.Vec2(this.time,0);
            break;
        case 2:
            this.v = new pc.Vec2(-1 * this.time,0);
            break;
        case 3:
            this.v = new pc.Vec2(0,this.time);
            break;
        case 4:
            this.v = new pc.Vec2(0,-1 * this.time)
        }
        for (i = 0; i < this.mats.length; ++i) {
            var e = this.mats[i].resource;
            this.diffuse && (e.diffuseMapOffset = this.v),
            this.emissive && (e.emissiveMapOffset = this.v),
            this.opacity && (e.opacityMapOffset = this.v),
            e.update()
        }
    }
}
;
var LoadAssets = pc.createScript("loadAssets");
LoadAssets.attributes.add("tag", {
    type: "string"
}),
LoadAssets.prototype.initialize = function() {
    console.log("开始加载额外资源"),
    this.loadAsset()
}
,
LoadAssets.prototype.loadAsset = function() {
    var s = this.app.assets.findByTag(this.tag);
    console.log("资源数:" + s.length);
    var o = s.length
      , t = 0
      , e = this;
    s.forEach((function(s) {
        s.once("error", (function(s, e) {
            console.log("加载失败:" + s),
            ++t >= o && console.log("资源加载完成")
        }
        )),
        s.ready((function(s) {
            ++t >= o && console.log("资源加载完成")
        }
        )),
        e.app.assets.load(s)
    }
    ))
}
;

// https://pano.avatr.com/3d/online/index.html?carType=0

// https://pulsejs.org/

// https://github.com/tweenjs/tween.js/

// http://createjs.com/tweenjs
