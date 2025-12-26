from PIL import Image

def remove_light_background(input_path, output_path, threshold=240):
    img = Image.open(input_path).convert('RGBA')
    data = img.getdata()
    new_data = []
    for item in data:
        r, g, b, a = item
        if r > threshold and g > threshold and b > threshold:
            new_data.append((r, g, b, 0))
        else:
            new_data.append(item)
    img.putdata(new_data)
    img.save(output_path, 'PNG')
    print(f"Saved: {output_path}")

# Process Harbor UCLA
remove_light_background("Harbor UCLA logo.png", "Harbor UCLA logo.png", threshold=245)
