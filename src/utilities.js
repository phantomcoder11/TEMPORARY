export const drawRect = (detections, ctx)=>{
    detections.forEach(predictions => {
        const[x,y,width,height] = predictions['bbox'];
        const text = predictions['class'];

        const color ='red'
        ctx.strokeSytle = color
        ctx.font = '38px Arial'
        ctx.fillStyle = color

        ctx.lineWidth ="4";
        ctx.strokeStyle = "blue";
        
        ctx.beginPath()
        ctx.fillText(text,x,y)
        ctx.rect(x,y,width,height)
        ctx.stroke()
    })
}