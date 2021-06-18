import numpy as np
import cmath as math
import matplotlib.pyplot as plt
from scipy import signal
from flask import Flask, render_template , request
angel = np.arange(0, 181, 1)
app = Flask(__name__, template_folder='html', static_folder='static')



def get_mag(zeros : list ,poles : list):
    transfer_function=get_transfer_function(zeros, poles)
    mag=np.absolute(transfer_function)
    fig=plt.figure()
    plt.plot(angel*np.pi/180,mag)
    plt.ylabel('frequency')
    plt.savefig('mag.png')
    # plt.show()

def get_phase(zeros : list ,poles : list):
    transfer_function=get_transfer_function(zeros,poles)
    phase=np.angle(transfer_function)
    fig=plt.figure()
    plt.plot(angel*np.pi/180,phase)
    plt.ylabel('phase')
    plt.savefig('phase.png')
    # plt.show()

def all_passfilter(zeros: list,poles : list ,a: float):
    filtered_transfer_function= get_transfer_function(zeros, poles)
    filtered_transfer_function*=1-np.exp(1j*angel*np.pi/180)*np.complex(a,0)
    filtered_transfer_function/=np.exp(1j*angel*np.pi/180)-np.complex(a,0)
    fig=plt.figure()
    plt.plot(angel*np.pi/180,np.angle(filtered_transfer_function))
    plt.ylabel('filtered phase')
    plt.savefig('filtered.png')
    return filtered_transfer_function
    # plt.show()



def get_transfer_function(zeros, poles):
    transfer_function=1
    for i in zeros:
        transfer_function*=np.exp(-1j*angel*np.pi/180)-np.complex(i[0],i[1])
    for i in poles:
        transfer_function/=np.exp(-1j*angel*np.pi/180)-np.complex(i[0],i[1])
    return transfer_function

def begin(zeros,poles,a):
    get_mag(zeros,poles)
    get_phase(zeros,poles)
    all_passfilter(zeros,poles,a)

@app.route('/',methods=["GET"])
def index():
    return render_template("index.html")
@app.route('/',methods=["POST"])
def running():
    zeros=request.form["zeros"]
    poles=request.form["poles"]
    a=request.form["all pass filter constant"]
    begin(zeros,poles,a)
    return render_template("index.html",zeros=zeros,poles=poles,a=a)


if __name__ == '__main__':
    app.run()


# def double_filter(zeros: list,poles : list ,a: float,filtered_tf: list):
#     double_transfer_function=filtered_tf
#     double_transfer_function*=1-np.exp(1j*angel*np.pi/180)*np.complex(a,0)
#     double_transfer_function/=np.exp(1j*angel*np.pi/180)-np.complex(a,0)
#     fig=plt.figure()
#     plt.plot(angel*np.pi/180,np.angle(double_transfer_function))
#     plt.ylabel('filtered phase')
#     plt.savefig('double_filtered.png')
#     return double_transfer_function