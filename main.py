import numpy as np
import cmath as math
import matplotlib.pyplot as plt
from scipy import signal
from flask import Flask, render_template, request
angel = np.arange(0, 181, 1)
z=[]
p=[]
app = Flask(__name__, template_folder='html', static_folder='static')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

fig = plt.figure()


@app.after_request
def add_header(r):
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r


def get_mag(zeros: list, poles: list):
    transfer_function = get_transfer_function(zeros, poles)
    mag = np.absolute(transfer_function)
    fig = plt.figure()
    plt.plot(angel*np.pi/180, mag)
    plt.ylabel('frequency')
    plt.savefig('static/img/mag.png')


def get_phase(zeros: list, poles: list):
    transfer_function = get_transfer_function(zeros, poles)
    phase = np.angle(transfer_function)
    fig = plt.figure()
    plt.plot(angel*np.pi/180, phase)
    plt.ylabel('phase')
    plt.savefig('static/img/phase.png')


def all_passfilter(zeros: list, poles: list, z: list, p: list):
    filtered_transfer_function = get_transfer_function(zeros, poles)
    try:
        for i in z:
            mag = 1/(((i[0])**2+(i[1])**2) ** 0.5)
            phase = -1 * math.tan(i[1]/i[0])
            poles.append([mag*math.cos(phase), mag*math.sin(phase)])
            filtered_transfer_function /= np.exp(1j *
                                                 angel*np.pi/180) - (mag * np.exp(1j*phase))
    except:
        try:
            for i in p:
                mag = 1/(((i[0])**2+(i[1])**2) ** 0.5)
                phase = -1 * math.tan(i[1]/i[0])
                zeros.append([mag*math.cos(phase), mag*math.sin(phase)])
                filtered_transfer_function *= np.exp(
                    1j*angel*np.pi/180) - (mag * np.exp(1j*phase))
        except:
            pass
    filtered_phase = np.angle(filtered_transfer_function)
    plt.plot(angel*np.pi/180, filtered_phase)
    plt.ylabel('filtered_phase')
    plt.savefig('static/img/after_filter_phase.png')

    return zeros, poles


def get_transfer_function(zeros, poles):
    transfer_function = 1
    for i in zeros:
        transfer_function *= np.exp(-1j*angel*np.pi/180)-np.complex(i[0], i[1])
    for i in poles:
        transfer_function /= np.exp(-1j*angel*np.pi/180)-np.complex(i[0], i[1])
    return transfer_function


def begin(zeros: list, poles: list, z: list, p: list):
    get_mag(zeros, poles)
    get_phase(zeros, poles)
    zeros, poles = all_passfilter(zeros, poles, z, p)
    return zeros, poles


@app.route('/', methods=["GET"])
def index():
    return render_template("index.html")


@app.route('/', methods=["POST"])
def running():
    zeros = request.get_json().get("zeros")
    poles = request.get_json().get("poles")
    # z = request.get_json().get("zeros_out_of_range")
    # p = request.get_json().get("poles_out_of_range")
    for i in zeros:
        if (((i[0])**2+(i[1])**2) ** 0.5>1):
            z.append(i)
    for i in poles:
        if (((i[0])**2+(i[1])**2) ** 0.5>1):
            p.append(i)
    print(f"received request with parameters: zeros={zeros}, poles={poles}")
    zeros, poles = begin(zeros, poles, z, p)
    return render_template("index.html", zeros=zeros, poles=poles,p=p,z=z)


if __name__ == '__main__':
    app.run()
