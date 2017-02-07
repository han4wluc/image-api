
local app = require 'waffle'
local image = require 'image'
require 'nn'

app.port = 3002

local model = torch.load('./model.t7')

app.post('/', function(req, res)
   
  input_path = req.form.inputPath
  output_path = req.form.outputPath

  print('input_path', input_path)
  print('output_path', output_path)

  sys.tic()
  input_image = image.load(input_path)
  print(sys.toc())
  sys.tic()
  output_image = model:forward(input_image[{{1,3}}])
  print(sys.toc())
  sys.tic()
  image.save(output_path, output_image)
  print(sys.toc())

  res.send('upscale success')

end)

app.listen()
