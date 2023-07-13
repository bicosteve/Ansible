/*
ANSIBLE MODULES
- these are discrete units of code that can be used forom the command line or in a playbook task.
- ansible executes each module usually on the remotely managed node, and collects return values

1. SetUp Module
- used to get 'Facts' while executing ansible playbooks.
- the module is automatically called by 'Playbooks' to get information about remote host/ansible client.
- run ansible all -m setup: returns all the the information about the remote machine.
- to filter set settings use ansible all -m setup -a "filter=ansible_memory_mb"
- ansible-doc -l | grep gcp: returns all the gcp modules on the available on ansible

2. Ansible Facts
- Facts are used to get ansible client information like OS, Processor, Release, IP etc.
- Every infrastructure related information 
- facts can be got using setup module
- task of getting ansible client information is called 'Gathering Facts' and the gathered information is called Facts or Variables.
- set up module is used to collect facts.  Playbook defulat moudle uses set up module to get client information.

3. Creating Custom Facts
There are two types of facts
(a) - Default Facts which comes with setup modules
(b) - Custom Facts which is user defined
- complete implementation depends on custom facts
- used to get extra information about the managed nodes. 
- if custom facts are on managed nodes, then they will be called managed nodes.
- helps reduce code line in the playbooks.
- are helpful in building logic about environment configs.

Steps for Creating Custom Facts
- create /etc/ansible/facts.d on the managed node/client
- insed the facts.d create one or more custom facts file with extension of '.facts' 
- the outpuf of the facts file must be json
- fact file should have execution persion like 0755

- open your client and run sudo su - : this navigates to the root
- run sudo yum list installed 
- use sudo yum list installed | grep git : to check for git 
- sudo yum listed installed | grep httpd : check for httpd
- use sudo yum install httpd
- to get git version use git --version | awk '{print $3}'
- to get httpd version httpd --version | awk '{print $3}' 

=> put the above commands in shell file.
use vim or nano and create a shebang

=> use getfacts.sh
=> start with a shebang
=> write your commands
=> save and quit

## This is the getfacts.sh file contents
  GNU nano 5.8                                                                                        getfacts.sh                                                                                                  
#!/bin/bash
git_version=$(git --version | awk '{print $3}')
httpd_version=$(httpd -v | awk 'NR==1 {print $3}')

cat << EOF
{
   "GIT_VERSION":"$git_version",
   "HTTPD_VERSION":"$httpd_version"

}

=> Create a /tmp/get_version.facts
=> paste the shell script on the there and save
=> open the inventory folder with nano /inventory/prod/hosts
=> add the machines
=> run ansible web_app -m file -a "path=/etc/ansible/facts.d/ state=directory" -b
=> will create the directory with 775 permissions
=> ll /tmp/
=> copy the 'get_version.facts' from your machine to your client/node 
=> ansible web_app -m copy -a "src=/tmp/get_version.fact dest=/etc/ansible/facts.d mode='0755'" -b 
=> will copy the file to ansible client
=> 

*/
